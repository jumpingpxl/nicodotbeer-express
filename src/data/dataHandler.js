const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const util = require("util");

const FileSchema = require("./schemas/fileSchema");
const UserSchema = require("./schemas/userSchema");

const minNameLength = 8;
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const charactersLength = characters.length;

const uploadFolder = path.join(__dirname + "/../..", "uploads");

class DataHandler {
  constructor(options) {}

  uploadFile(req, res) {
    const fileData = req.files.file;
    const userKey = req.body.userKey;
    return new Promise((resolve, reject) => {
      getUserData({userKey: userKey}, "userId roleId autoVisibility").then(user => {
        generateRandomName(0).then(randomName => {
          const fileExtention = path.extname(fileData.name);
          const file = new FileSchema({
            fileId: randomName,
            uploaderId: user.userId,
            fileName: randomName + fileExtention,
            mimeType: fileData.mimetype,
            visible: user.autoVisibility
          });

          file.save().then(saved => {
            if(!saved) {
              reject("An error occured while saving your file to the database")
            } else {
              getUploadFolder(file.uploaderId).then(folderPath => {
                fs.writeFile(path.join(folderPath, file.fileName), fileData.data, (_finished) => {
                  resolve(file);
                })
              }).catch(err => reject(err));
            }
          }).catch(err => reject(err));
        }).catch(err => reject(err));
      }).catch(err => reject(err));
    });
  }

  getFile(fileName) {
    return new Promise((resolve, reject) => {
      getFileAndData(fileName, "uploadDate views", true).then(file => {
        getUserDataById(file.uploaderId, "userId discordId roleId").then(user => {
          resolve([file, user]);
        }).catch(err => resolve(file))
      }).catch(err => reject(err))
    });
  }

  getRawFile(fileName) {
    return getFileAndData(fileName, "mimeType");
  }
}

function getUserDataById(userId, keys) {
  return new Promise((resolve, reject) => {
    getUserData({userId: userId}, keys).then(user => {
      resolve(user)
    }).catch(err => reject(err));
  });
}

function getUserDataByDiscord(discordId, keys) {
  return new Promise((resolve, reject) => {
    getUserData({discordId: discordId}, keys).then(user => {
      resolve(user)
    }).catch(err => reject(err));
  });
}

function getUserData(filter, keys) {
  return new Promise((resolve, reject) => {
    UserSchema.findOne(filter, keys, function(err, user) {
      if(err) {
        reject(""+ err);
      } else if(!user) {
        reject("User not found!");
      } else {
        resolve(user);
      }
    });
  });
}

function getFileAndData(fileName, keys, justData) {
  const fileId = fileName.split(".")[0];
  return new Promise((resolve, reject) => {
    FileSchema.findOne(
      { fileId: fileId },
      "fileId uploaderId fileName " + keys,
      function (err, fileData) {
        if (err) {
          reject("" + err);
        } else if (!fileData) {
          reject("File " + fileName + " not found.");
        } else if(justData){
          resolve(fileData);
        } else {
          getUploadFolder(fileData.uploaderId).then((uploaderFolder) => {
            const filePath = path.join(uploaderFolder, fileData.fileName);
            fs.exists(filePath, (exists) => {
              if (exists) {
                fs.readFile(filePath, (err, buffer) => {
                  if (err) {
                    reject("" + err);
                  } else {
                    resolve([buffer, fileData]);
                  }
                });
              } else {
                reject(
                  "File " +
                    fileName +
                    " not found. This is most likely due to an error."
                );
              }
            });
          });
        }
      }
    );
  });
}

async function getUploadFolder(uploaderId, mainFolderExists) {
  return new Promise((resolve) => {
    if (!mainFolderExists) {
      fs.exists(uploadFolder, (exists) => {
        if (!exists) {
          fs.mkdir(uploadFolder, (_finished) => {
            resolve(getUploadFolder(uploaderId, true));
          });
        } else {
          resolve(getUploadFolder(uploaderId, true));
        }
      });
    } else {
      const uploaderFolder = path.join(uploadFolder, uploaderId);
      fs.exists(uploaderFolder, (exists) => {
        if (!exists) {
          fs.mkdir(uploaderFolder, (_finished) => {
            resolve(uploaderFolder);
          });
        } else {
          resolve(uploaderFolder);
        }
      });
    }
  });
}

function generateRandomName(attempt) {
  return new Promise((resolve, reject) => {
    let nameLength = 8;
    if (attempt >= 10) {
      nameLength = nameLength + 1;
    }

    if (attempt === 15) {
      reject("Couldn't find a random name that's available");
    } else {
      const randomName = getRandomString(nameLength);
      FileSchema.findOne({ fileId: randomName })
        .select("fileId")
        .exec((err, file) => {
          if (err) {
            reject("An error occured while connecting to our database");
          } else if (file) {
            console.log(
              `Couldn't claim Name ${randomName}. Trying again (attempt ${attempt})`
            );
            resolve(generateRandomName(attempt + 1));
          } else {
            resolve(randomName);
          }
        });
    }
  });
}

function getRandomString(length) {
  let randomName = "";
  for (let i = 0; i < length; i++) {
    randomName += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }

  return randomName;
}

const dataHandler = (module.exports = exports = new DataHandler());
