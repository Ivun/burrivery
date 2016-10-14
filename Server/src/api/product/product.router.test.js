import test from 'ava'
import request from 'supertest-as-promised'
import mockgoose from 'mockgoose'
import express from '../../config/express'
import mongoose from '../../config/mongoose'
import routes, { Product } from '.'

const app = () => express(routes)

test.before(async (t) => {
  await mockgoose(mongoose)
  await mongoose.connect('')
})

test.beforeEach(async (t) => {
  const product = await Product.create({})
  t.context = { ...t.context, product }
})

test.afterEach.always(async (t) => {
  await Product.remove()
})

test.serial('POST /products 201', async (t) => {
  const { status, body } = await request(app())
    .post('/')
  t.true(status === 201)
  t.true(typeof body === 'object')
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
