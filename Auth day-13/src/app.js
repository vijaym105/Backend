const express = require('express')
const app = express()
const authRoute = require('../route/auth.route')
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.use(express.json())

app.use('/api/auth', authRoute)


module.exports = app