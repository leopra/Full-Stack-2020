const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

//TODO why populate user is singular, blogs plural?
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})


blogRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (!body.title || !body.url) {
    return response.status(400).json({ "result": "Bad Request" })
  }

  const user = await User.findOne()

  const blog = new Blog({
    title: body.title,
    author: body.author || "",
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)

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