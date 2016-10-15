import test from 'ava'
import Promise from 'bluebird'
import request from 'supertest-as-promised'
import mockgoose from 'mockgoose'
import { signSync } from '../../services/jwt'
import express from '../../config/express'
import mongoose from '../../config/mongoose'
import { User } from '../user'
import routes, { Product } from '.'

const app = () => express(routes)

test.before(async (t) => {
  await mockgoose(mongoose)
  await mongoose.connect('')
})

test.beforeEach(async (t) => {
  const [ user, anotherUser, admin ] = await User.create([
    { email: 'a@a.com', password: '123456' },
    { email: 'b@b.com', password: '123456' },
    { email: 'c@c.com', password: '123456', role: 'admin' }
  ])
  const [ userSession, anotherSession, adminSession ] = [
    signSync(user.id), signSync(anotherUser.id), signSync(admin.id)
  ]
  const product = await Product.create({})
  t.context = { ...t.context, userSession, anotherSession, adminSession, product }
})

test.afterEach.always(async (t) => {
  await Promise.all([User.remove(), Product.remove()])
})

test.serial('POST /products 201 (user)', async (t) => {
  const { userSession } = t.context
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession })
  t.true(status === 201)
  t.true(typeof body === 'object')
})

test.serial('POST /products 401', async (t) => {
  const { status } = await request(app())
    .post('/')
  t.true(status === 401)
})

test.serial('GET /products 200', async (t) => {
  const { status, body } = await request(app())
    .get('/')
  t.true(status === 200)
  t.true(Array.isArray(body))
})

test.serial('GET /products/:id 200', async (t) => {
  const { product } = t.context
  const { status, body } = await request(app())
    .get(`/${product.id}`)
  t.true(status === 200)
  t.true(typeof body === 'object')
  t.true(body.id === product.id)
})

test.serial('GET /products/:id 404', async (t) => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  t.true(status === 404)
})

test.serial('PUT /products/:id 200', async (t) => {
  const { product } = t.context
  const { status, body } = await request(app())
    .put(`/${product.id}`)
  t.true(status === 200)
  t.true(typeof body === 'object')
  t.true(body.id === product.id)
})

test.serial('PUT /products/:id 404', async (t) => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
  t.true(status === 404)
})

test.serial('DELETE /products/:id 204', async (t) => {
  const { product } = t.context
  const { status } = await request(app())
    .delete(`/${product.id}`)
  t.true(status === 204)
})

test.serial('DELETE /products/:id 404', async (t) => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  t.true(status === 404)
})
