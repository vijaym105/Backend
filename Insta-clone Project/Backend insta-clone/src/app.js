const  express = require('express')
const auth = require('../routes/auth')
const post = require('../routes/post.route')
const userFollow = require('../routes/user')
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',auth)

app.use('/api/post',post)

app.use('/api', userFollow)

module.exports = app