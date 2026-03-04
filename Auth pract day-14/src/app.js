const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const auth = require('../routes/auth.route')
app.use(express.json())
app.use(cookieParser())
app.use('/api',auth)


module.exports = app