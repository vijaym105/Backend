import connectDB from './config/database.js'
import app from './src/app.js'
import {testAi} from './services/ai.service.js'


await connectDB()

testAi()

app.listen(3000, () => {
  console.log('server is running on port 3000')
})

