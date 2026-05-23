const {Router} = require('express')
const authController = require('../controllers/auth.controller')
const middleware = require('../middleware/auth.middleware')

const route = Router()
console.log(authController)
console.log(middleware)
route.post('/register',  authController.registerUser)
route.post('/login', authController.loginUser)
route.get('/get-me', middleware.authMiddleware , authController.getMe )

module.exports = route