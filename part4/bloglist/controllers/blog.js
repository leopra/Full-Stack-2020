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

  if (!body.title || !body.url) {
    response.status(400).json({ "result": "Bad Request" })
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

blogRouter.delete('/:id', async (request, response) => {
  const result = await Blog.deleteOne({ _id: request.params.id })
  response.status(204).end()
})

//change a blog information
blogRouter.put('/:id', async (request, response) => {
  console.log(request.body)
  console.log(request.params.id)
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author || "",
    url: body.url,
    likes: body.likes || 0,
  }

  const res = await Blog.findByIdAndUpdate(request.params.id, blog)
  console.log(res)
  response.json(res)
})

module.exports = blogRouter