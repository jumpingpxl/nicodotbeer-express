const express = require("express");
const fileUpload = require("express-fileupload");
const logger = require("morgan");

const Mongoose = require("mongoose");
const Path = require("path");
const BodyParser = require("body-parser");
const App = express();

const port = 3000;

Mongoose.connect(process.env.MONGO_CONNECTIONSTRING, {
  dbName: process.env.MONGO_DATABASE,
});

App.use(BodyParser.json());
App.use(BodyParser.urlencoded({ extended: true }));
App.use(
  fileUpload({
    safeFileNames: true,
    preserveExtension: 32,
    limits: { fileSize: 1024 * 1024 * 100 },
  })
);

App.set("views", Path.join(__dirname, "./src/views"));
App.set("view engine", "ejs");

App.use(logger("dev"));
App.use(express.static(Path.join(__dirname, "./public")));

App.use("/", require("./src/routes/routes"));

App.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
