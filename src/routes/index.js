const express = require("express");
const dataHandler = require("../data/dataHandler");

const Router = express.Router();

Router.get("/:filename", function (req, res) {
  const fileName = req.params.filename;
  if(req._parsedUrl.pathname.substring(1).includes("/")) {
    res.end();
  } else {
    dataHandler.getFile(fileName).then(([file, user]) => {
      console.log(user);
      res.render('../views/layout', {
        req: req,
        title: "Home",
        body: "file",
        file: file,
        user: user
      });
    }).catch(err => {
      res.render('../views/layout', {
        req: req,
        title: "Home",
        body: "file",
        file: {
          fileName: null
        },
        errors: ["" + err]
      });
    });;
  }
});

Router.get("/", function (req, res) {
  res.render('../views/layout', {
    req: req,
    title: "Home",
    body: "index"
  });
});

module.exports = Router;
