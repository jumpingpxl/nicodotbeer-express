const express = require("express");

const Router = express.Router();

Router.get("/:filename", function (req, res) {
  const fileName = req.params.filename;
});

module.exports = Router;
