const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const util = require("util");

const FileSchema = require("./schemas/fileSchema");
const UserSchema = require("./schemas/userSchema");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const existsFile = util.promisify(fs.exists);
const mkDir = util.promisify(fs.mkdir);

const minNameLength = 8;
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const charactersLength = characters.length;

const uploadFolder = path.join(__dirname + "/../..", "uploads");

class DataHandler {
  constructor(options) {}

  async uploadFile(req, res) {
    const fileData = req.files.file;
    const fileExtention = path.extname(fileData.name);

    const fileId = await generateRandomName(0);
    if (!fileId) {
      return "An error occured while getting a random id. Reason: " + err;
    }

    const file = new FileSchema({
      fileId: fileId,
      uploaderId: "test",
      fileName: fileId + fileExtention,
      mimeType: fileData.mimetype,
    });

    const result = await file.save();
    if (!result) {
      return "An error occured while getting saving your file to the database.";
    }

    await writeFile(
      path.join(await getUploadFolder(file.uploaderId), file.fileName),
      fileData.data
    );

    res.end("http://localhost:3000/" + file.fileName);
    return undefined;
  }

  getFile(req, res) {}

  getFileAndData(req, res, keys) {}
}

async function getUploadFolder(uploaderId) {
  if (!(await existsFile(uploadFolder))) {
    await mkDir(uploadFolder);
  }

  const uploaderFolder = path.join(uploadFolder, uploaderId);
  if (!(await existsFile(uploaderFolder))) {
    await mkDir(uploaderFolder);
  }

  return uploaderFolder;
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
