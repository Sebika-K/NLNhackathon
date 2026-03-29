import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import checkinRouter from './routes/checkin'
import dashboardRouter from './routes/dashboard'
import alertRouter from './routes/alert'
import recommendRouter from './routes/recommend'
import storiesRouter from './routes/stories'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'DIDI backend is running!' })
})

app.use('/checkin', checkinRouter)
app.use('/dashboard', dashboardRouter)
app.use('/alert', alertRouter)
app.use('/recommend', recommendRouter)
app.use('/stories', storiesRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`DIDI server running on port ${PORT}`)
})

module.exports = app