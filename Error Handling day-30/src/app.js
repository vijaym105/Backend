import express from 'express'
import authRouter from '../routes/auth.routes.js'
import errHandler from '../middleware/error.middleware.js'

const app = express()

app.use('/api/auth', authRouter)
app.use(errHandler())

export default app