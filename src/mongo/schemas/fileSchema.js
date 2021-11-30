const Mongoose = require('mongoose');

const FileSchema = new Mongoose.Schema({
    fileId: {
        type: String,
        required: true
    },
    uploaderId: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        required: false,
        default: Date.now()
    },
    expireDate: {
        type: Date,
        required: false
    },
    fileData: {
        type: mongoose.Schema.Types.Subdocument,
        required: true
    }
})

module.exports = Mongoose.model("File", FileSchema, "files");