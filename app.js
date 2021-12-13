const express = require("express");
const fileUpload = require("express-fileupload");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const App = express();

mongoose.connect(process.env.MONGO_CONNECTIONSTRING, {
  dbName: process.env.MONGO_DATABASE,
});

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));
App.use(
  fileUpload({
    safeFileNames: true,
    preserveExtension: 32,
    limits: { fileSize: 1024 * 1024 * 100 },
  })
);

App.set("views", path.join(__dirname, "./src/views"));
App.set("view engine", "ejs");

App.use(logger("dev"));
App.use(express.static(path.join(__dirname, "./public")));

App.use("/", require("./src/routes/routes"));

App.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});
