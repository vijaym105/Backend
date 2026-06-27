import express from 'express'
import cookieParser from 'cookie-parser'
import authRouter from '../routes/auth.routes.js'
const app = express()
app.use(express.json())

app.use('/api/auth', authRouter)

app.use(cookieParser())

export default app