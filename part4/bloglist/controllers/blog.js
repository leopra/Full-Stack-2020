const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')


//TODO why populate user is singular, blogs plural?
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})



blogRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log('a', request)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (!body.title || !body.url) {
    return response.status(400).json({ "result": "Bad Request" })
  }

  const user = await User.findById(decodedToken.id)

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
  const token = request.token
  const decodedToken = jwt.verify(token, config.SECRET)

  if (!request || !decodedToken) {
    return response.status(401).json( { error: 'token missing or invalid ' })
  }

  const blog = await Blog.findById(request.params.id)
  if ( blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json( { error: 'permission denied ' })
  }

  const result = await Blog.deleteOne({ _id: request.params.id })
  response.status(204).end()
})



//change a blog information
blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author || "",
    url: body.url,
    likes: body.likes || 0,
  }

  const res = await Blog.findByIdAndUpdate(request.params.id, blog)
  response.json(res)
})



module.exports = blogRouter