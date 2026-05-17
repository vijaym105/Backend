const  express = require('express')
const auth = require('../routes/auth')
const post = require('../routes/post.route')
const userFollow = require('../routes/user')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        const allowed = (process.env.FRONTEND_URL || '').split(',').map(u => u.trim())
        
        allowed.push('http://localhost:5173')
        allowed.push('http://localhost:5174')
        allowed.push('http://localhost:3000')

        if (!origin || allowed.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}))


app.use('/api/auth',auth)

app.use('/api/post',post)

app.use('/api', userFollow)

module.exports = app