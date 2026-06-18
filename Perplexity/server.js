import connectDB from './config/database.js'
import app from './src/app.js'

await connectDB()

app.listen(3000, () => {
  console.log('server is running on port 3000')
})