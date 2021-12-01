const express = require("express");
const dataHandler = require("../data/dataHandler");

const Router = express.Router();

Router.post("/", async (req, res) => {
  const error = await dataHandler.uploadFile(req, res);
  if (error) {
    console.log(error);
    res.writeHead(400);
    res.end(400 + ":" + error);
  }
});

module.exports = Router;
