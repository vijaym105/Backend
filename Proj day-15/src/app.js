const  express = require('express')
const auth = require('../routes/auth')
const post = require('../routes/post.route')
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.json())

app.use('/api/auth',auth)
app.use('/api/post',post)
app.use(cookieParser())

module.exports = app