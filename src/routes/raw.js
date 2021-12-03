const express = require("express");
const dataHandler = require("../data/dataHandler");

const Router = express.Router();

Router.get("/:filename", function (req, res) {
  const fileName = req.params.filename;
  dataHandler.getRawFile(fileName).then(([file, fileData]) => {
    res.writeHead(200, {
      'Content-Type': fileData.mimeType,
      'Content-Length': file.length
    });

    res.end(file);
  }).catch(err => {
    res.writeHead(404);
    res.end("" + err);
  });
});

Router.get("/", function (req, res) {
  res.send("hello worlds");
});

module.exports = Router;
