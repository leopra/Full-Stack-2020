const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})


blogRouter.post('/', (request, response) => {
  const body = request.body

  if (body.title || body.url) {
    response.status(400).json({"result":"Bad Request"})
  }
  const blog = new Blog({
    title: body.title,
    author: body.author || "",
    url: body.url,
    likes: body.likes || 0,
  })

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogRouter