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

const mongoURL = 'mongodb+srv://trachit752:rachit123@cluster0.aj5o1f1.mongodb.net/blogs?retryWrites=true&w=majority'
mongoose.connect(mongoURL).then(res => {
    console.log("Connected")
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
        console.log(result)
        response.status(201).json(result)
    })
})

const PORT = 3003

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})