const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const InitialNumberBlogs = 3

test('number of notes', async () => {
  const result = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(result.body.length).toBe(InitialNumberBlogs)
})

test('every blog has id', async () => {
  const result = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  console.log(result.body)
  result.body.map((blog) => expect(blog.id).toBeDefined())
})

test('new blog added', async () => {

  const newBlog = {
    "title": 'paolino',
    "author": 'paperino',
    "url": 'www.paolinopaeprino.com',
    "likes": 33
  }

  const result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const updatedblogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(updatedblogs.body.length).toBe(InitialNumberBlogs + 1)
})

test('if no likes, likes set to zero', async () => {

  const noLikesBlog = {
    'title': 'paolino',
    'author': 'paperino',
    'url': 'www.paolinopaperino.com'
  }

  const result = await api
    .post('/api/blogs')
    .send(noLikesBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(result.body.likes).toBeDefined().toBe(0)

})

test('if no title or url, response 400', async () => {

  const noTitleBlog = {
    'title': '',
    'author': 'sfafaf',
    'url': 'www.paolinopaperino.com',
    'likes': 3
  }

  const result = await api
    .post('/api/blogs')
    .send(noTitleBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})

test('delete one Blog', async () => {

  // i create a blog so i know the id to delete
  const Blog = {
    'title': 'todelete',
    'author': 'sfafaf',
    'url': 'www.paolinopaperino.com',
    'likes': 3
  }
  const toDelete = await api
    .post('/api/blogs')
    .send(Blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const result = await api
    .delete(`/api/blogs/${toDelete.body.id}`)
    .expect(204)

})



test('change Blog info', async () => {

  // i create a blog so i know the id to change
  const blog = {
    'title': 'tochange',
    'author': 'sfafaf',
    'url': 'www.paolinopaperino.com',
    'likes': 3
  }
  const toChange = await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  
  const result = await api
    .put(`/api/blogs/${toChange.body.id}`)
    .send({...blog, "title": "CHANGED", })
    .expect(200)

})

afterAll(() => {
  mongoose.connection.close()
})