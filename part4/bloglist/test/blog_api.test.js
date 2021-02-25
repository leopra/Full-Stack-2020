const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)
const bearerluca = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imx1Y2EiLCJpZCI6IjYwMzdlMzA2NDQyY2Q5NTllNmFjMjQ2MCIsImlhdCI6MTYxNDI4ODMwOX0.2lpXHFlEZ_tBv6RtV3mq4IEza1__MfII8KQpacdzvyc"
const initialBlogs = [
  {
    title: 'cavolo',
    author: 'doore',
    url: 'www.sf.com',
    likes: 7,
    user: '60380a39d489e6ab5d8c1572'
  },
  {
    title: 'pomodoro',
    author: 'kult',
    url: 'www.kult.com',
    likes: 5,
    user: '60380a39d489e6ab5d8c1572'
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)

})

test('number of notes', async () => {
  const result = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(result.body.length).toBe(initialBlogs.length)
})

test('every blog has id', async () => {
  const result = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  result.body.map((blog) => expect(blog.id).toBeDefined())
})

describe('POST BLOGS', () => {
  test('new blog added', async () => {

    const newBlog = {
      "title": 'paolino',
      "author": 'paperino',
      "url": 'www.paolinopaeprino.com',
      "likes": 33
    }

    const result = await api
      .post('/api/blogs')
      .set({ Authorization: bearerluca })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const updatedblogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(updatedblogs.body.length).toBe(initialBlogs.length + 1)
  })

  test('new blog added 401', async () => {

    const newBlog = {
      "title": 'paolino',
      "author": 'paperino',
      "url": 'www.paolinopaeprino.com',
      "likes": 33
    }

    const result = await api
      .post('/api/blogs')
      .set({ Authorization: 'fak' })
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

test('if no likes, likes set to zero', async () => {

  const noLikesBlog = {
    'title': 'paolino',
    'author': 'paperino',
    'url': 'www.paolinopaperino.com'
  }

  const result = await api
    .post('/api/blogs')
    .set({ Authorization: bearerluca })
    .send(noLikesBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(result.body.likes).toBeDefined()
  expect(result.body.likes).toBe(0)
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
    .set({ Authorization: bearerluca })
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
    .set({ Authorization: bearerluca })
    .send(Blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const result = await api
    .delete(`/api/blogs/${toDelete.body.id}`)
    .set({ Authorization: bearerluca })
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
    .set({ Authorization: bearerluca })
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const result = await api
    .put(`/api/blogs/${toChange.body.id}`)
    .set({ Authorization: bearerluca })
    .send({ ...blog, "title": "CHANGED", })
    .expect(200)

})



afterAll(() => {
  mongoose.connection.close()
})