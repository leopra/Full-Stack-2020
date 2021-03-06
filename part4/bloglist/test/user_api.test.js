const { endsWith } = require('lodash')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('non unique username', async () => {

  const result = await api
    .post('/api/users')
    .send({ "username": "aaaaaa", "password": "2414124" })
    .expect(400)

})

test('no username', async () => {

  const result = await api
    .post('/api/users')
    .send({ "username": "", "password": "2414124" })
    .expect(400)

})

test('no password', async () => {

  const result = await api
    .post('/api/users')
    .send({ "username": "aaaaaa", "password": "" })
    .expect(400)

})

test('short password', async () => {

  const result = await api
    .post('/api/users')
    .send({ "username": "aaafafafff", "password": "24" })
    .expect(400)

})


test('short username', async () => {

  const result = await api
    .post('/api/users')
    .send({ "username": "aa", "password": "241" })
    .expect(400)

})

afterAll(() => {
  mongoose.connection.close()
})