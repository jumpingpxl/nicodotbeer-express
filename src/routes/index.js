const express = require("express");
const dataHandler = require("../data/dataHandler");

const Router = express.Router();

Router.get("/:filename", function (req, res) {
  const fileName = req.params.filename;
  if(req._parsedUrl.pathname.substring(1).includes("/")) {
    res.end();
  } else {
    dataHandler.getFile(fileName);
  }
});

Router.get("/", function (req, res) {
  res.send("hello world");
});

module.exports = Router;
