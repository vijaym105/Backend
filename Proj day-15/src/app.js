const  express = require('express')
const auth = require('../routes/auth')
const post = require('../routes/post.route')
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',auth)
app.use('/api/post',post)


module.exports = app