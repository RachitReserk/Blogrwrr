const logger = require('../utils/logger')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/' , (request , response) => {
Blog.find({}).then(blog => {
    response.json(blog)
})
})

blogRouter.post('/' , (request , response) => {
    const blog = new Blog(request.body)
    blog.save().then(result => {
        logger.info(result)
        response.status(201).json(result)
    })
})

module.exports = blogRouter