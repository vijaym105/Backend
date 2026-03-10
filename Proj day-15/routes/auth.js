const express = require('express') 
const auth = express()
const controller = require('../controller/auth.controller')


auth.post('/register',controller.registerController)

auth.post('/login', controller.loginController )


module.exports = auth