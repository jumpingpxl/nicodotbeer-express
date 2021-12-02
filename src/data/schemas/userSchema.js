const mongoose = require("mongoose");
const uuid = require("uuid");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false,
    default: uuid.v4(),
  },
  userKey: {
    type: String,
    required: true,
  },
  discordId: {
    type: String,
    required: true,
  },
  roleId: {
    type: Number,
    required: false,
    default: 0,
  },
  registrationDate: {
    type: Date,
    required: false,
    default: Date.now(),
  },
  tos: {
    type: Boolean,
    required: false,
    default: false,
  },
  autoVisibility: {
    type: Boolean,
    required: false,
    default: true,
  },
});

module.exports = mongoose.model("User", UserSchema, "users");
