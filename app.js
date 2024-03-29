const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware =require('./utils/middleware')

const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI).then(res => {
    logger.info("Connected to mongo")
})

app.use(cors())
app.use(express.json())

app.use('/api/blogs',blogRouter)

app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports= app