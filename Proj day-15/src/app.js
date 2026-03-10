const  express = require('express')
const auth = require('../routes/auth')
const cookieParser = require('cookie-parser')
const app = express()
app.use(express.json())
app.use('/api',auth)
app.use(cookieParser())

module.exports = app