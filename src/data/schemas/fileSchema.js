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
    fileName: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: false,
        default: 0
    }
})

module.exports = Mongoose.model("File", FileSchema, "files");