const express = require("express");
const router = express.Router();
const dataHandler = require("../data/dataHandler");
const authClient = require("../modules/discord/authClient");

const crypto = require('crypto');

router.get("/success", function (req, res) {
  const code = req.query.code;

  let error;
  if (!code) {
    error = "No Code Provided!";
  }

  if (!error) {
    authClient
      .getAccessToken(code, dataHandler.getDomainFromRequest(req))
      .catch((err) => (error = err))
      .then((token) => {
        if (!error) {
          res.cookie("sessionId", token.accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
          });

          console.log(token);
          res.redirect("/");
        } else {
          res.redirect("/?error=" + error);
        }
      });
  } else {
    console.log(error);
  }
});

router.get("/", function (req, res) {
  res.redirect(authClient.getInvite(dataHandler.getDomainFromRequest(req)));
});

module.exports = router;
