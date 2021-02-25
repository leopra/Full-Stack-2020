const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const usersRouter = require('./controllers/users')


app.use(cors())
app.use(express.json())

const blogRouter = require('./controllers/blog')

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)

const mongoUrl = config.MONGODB_URI
logger.info('connecting to', mongoUrl)
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })



module.exports = app

