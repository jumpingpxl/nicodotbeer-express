const express = require("express");
const dataHandler = require("../data/dataHandler");

const Router = express.Router();

Router.post("/", async (req, res) => {
  dataHandler.uploadFile(req).then(file => {
    res.end("http://localhost:3000/" + file.fileName);
  }).catch(err => {
    console.log("" + err);
    res.writeHead(400);
    res.end(400 + ":" + err);
  });


  /*const [error, result] = await dataHandler.uploadFile(req, res);
  if (error) {
    console.log(error);
    res.writeHead(400);
    res.end(400 + ":" + error);
  }

  res.end("http://localhost:3000/" + result.fileName); */
});

module.exports = Router;
