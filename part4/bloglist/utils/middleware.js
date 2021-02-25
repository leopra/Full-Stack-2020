//Remember that a normal middleware is a function with three parameters, 
//that at the end calls the last parameter next in order to move the control to next middleware:

const tokenExtractor = (request, response, next) => {
  request.token = null
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

module.exports = { tokenExtractor }