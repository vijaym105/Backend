const {Router} = require('express')
const authController = require('../controllers/auth.controller')

const route = Router()

route.post('/register', authController.registerUser)
route.post('/login', authController.loginUser)

module.exports = route