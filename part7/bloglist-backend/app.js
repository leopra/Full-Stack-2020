const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const blogRouter = require('./controllers/blog')

const mongoUrl = config.MONGODB_URI
logger.info('connecting to', mongoUrl)
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: false, useFindAndModify: false, useCreateIndex: true })

app.use(middleware.tokenExtractor)
app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/test')
    app.use('/api/testing', testingRouter)
  }
  

app.use(middleware.errorHandler)



module.exports = app

