const logger = require('./utils/logger')
const config = require('./utils/config')

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog',blogSchema)

mongoose.connect(config.MONGODB_URI).then(res => {
    logger.info("Connected")
})

app.use(cors())
app.use(express.json())

app.get('/api/blogs',(request,response) => {
    Blog.find({}.then( blogs => {
        response.json(blogs)
    }))
})

app.post('/api/blogs',(request,response) => {
    const blog = new Blog(request.body)
    blog.save().then(result => {
        logger.info(result)
        response.status(201).json(result)
    })
})

app.listen(config.PORT , () => {
    logger.info(`Server is running on port ${PORT}`)
})