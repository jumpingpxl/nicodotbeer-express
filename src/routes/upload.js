const express = require('express')

const Router = express.Router()
const Mongoose = require('mongoose')

const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const randomCharLength = randomChars.length

const minNameLength = 8

Router.post('/', async (req, res) => {
    const file = req.files.file;
})

async function generateRandomName() {

}

function getRandomString(length) {
    let randomName = ''
    for(var i = 0; i < length; i++) {
        randomName += randomNameChars.charAt(Math.floor(Math.random * randomCharLength))
    }

    return randomName;
}

module.exports = Router;