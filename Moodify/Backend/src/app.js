const express = require('express')
const cors = require('cors')
const route = require('../routes/song.route')

const app = express()

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}))

// Public song API. Authentication has been removed for the public demo.
app.use('/api/song', route)

module.exports = app
