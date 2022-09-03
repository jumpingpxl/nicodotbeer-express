const express = require("express");

const Router = express.Router();

Router.use("/raw", require("./raw"));

Router.use("/upload", require("./upload"));

Router.use("/login", require("./login"));

Router.use("/", require("./index"));

module.exports = Router;
