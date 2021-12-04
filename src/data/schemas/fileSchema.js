const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  fileId: {
    type: String,
    required: true,
  },
  uploaderId: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    required: false,
    default: Date.now(),
  },
  expireDate: {
    type: Date,
    required: false,
  },
  fileName: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    required: false,
    default: true
  },
  views: {
    type: Number,
    required: false,
    default: 0,
  },
});

module.exports = mongoose.model("File", FileSchema, "files");
