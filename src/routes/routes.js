const express = require('express')

const Router = express.Router()

Router.use('/', require('./index'))
Router.use('/upload', require('./upload'))

module.exports = Router;