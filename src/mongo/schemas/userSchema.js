const Mongoose = require('mongoose');

const uuid = require('uuid');

const UserSchema = new Mongoose.Schema({
    userId: {
        type: String, 
        required: false,
        default: uuid.v4()
    },
    userKey: {
        type: String,
        required: true
    },
    discordId: {
        type: String,
        required: true
    },
    roleId: {
        type: Number,
        required: false,
        default: 0
    },
    registrationDate: {
        type: Date,
        required: false,
        default: Date.now()
    },
    birthDate: {
        type: Date,
        required: true
    },
    tos: {
        type: Boolean,
        required: false,
        default: false
    },
    autoVisibility: {
        type: Boolean,
        required: false,
        default: true
    }
})

module.exports = Mongoose.model("User", UserSchema, "users");