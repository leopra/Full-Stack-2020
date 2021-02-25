const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {

  const body = request.body
  if (!body.username || !body.password || body.username.length < 3 || body.password.length < 3) {
    response.status(400).json({'error': 'error in username or password'})
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const body = request.body

  const res = await User.find({}).populate('blogs')
  response.json(res)
})

module.exports = usersRouter