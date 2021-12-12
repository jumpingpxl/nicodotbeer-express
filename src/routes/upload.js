const express = require("express");
const dataHandler = require("../data/dataHandler");

const Router = express.Router();

Router.post("/", async (req, res) => {
  dataHandler.uploadFile(req).then(file => {
    res.end((req.secure ? "https" : "http") + "://" + req.headers.host + "/" + file.fileName);
  }).catch(err => {
    console.log("" + err);
    res.writeHead(400);
    res.end(400 + ":" + err);
  });
});

module.exports = Router;
