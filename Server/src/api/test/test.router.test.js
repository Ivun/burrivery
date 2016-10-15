import test from 'ava'
import request from 'supertest-as-promised'
import mockgoose from 'mockgoose'
import express from '../../config/express'
import mongoose from '../../config/mongoose'
import routes, { Test } from '.'

const app = () => express(routes)

test.before(async (t) => {
  await mockgoose(mongoose)
  await mongoose.connect('')
})

test.beforeEach(async (t) => {
  const test = await Test.create({})
  t.context = { ...t.context, test }
})

test.afterEach.always(async (t) => {
  await Test.remove()
})

test.serial('POST /tests 201', async (t) => {
  const { status, body } = await request(app())
    .post('/')
    .send({ title: 'test', price: 'test' })
  t.true(status === 201)
  t.true(typeof body === 'object')
  t.true(body.title === 'test')
  t.true(body.price === 'test')
})

test.serial('GET /tests 200', async (t) => {
  const { status, body } = await request(app())
    .get('/')
  t.true(status === 200)
  t.true(Array.isArray(body))
})

test.serial('GET /tests/:id 200', async (t) => {
  const { test } = t.context
  const { status, body } = await request(app())
    .get(`/${test.id}`)
  t.true(status === 200)
  t.true(typeof body === 'object')
  t.true(body.id === test.id)
})

test.serial('GET /tests/:id 404', async (t) => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  t.true(status === 404)
})

test.serial('PUT /tests/:id 200', async (t) => {
  const { test } = t.context
  const { status, body } = await request(app())
    .put(`/${test.id}`)
    .send({ title: 'test', price: 'test' })
  t.true(status === 200)
  t.true(typeof body === 'object')
  t.true(body.id === test.id)
  t.true(body.title === 'test')
  t.true(body.price === 'test')
})

test.serial('PUT /tests/:id 404', async (t) => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ title: 'test', price: 'test' })
  t.true(status === 404)
})

test.serial('DELETE /tests/:id 204', async (t) => {
  const { test } = t.context
  const { status } = await request(app())
    .delete(`/${test.id}`)
  t.true(status === 204)
})

test.serial('DELETE /tests/:id 404', async (t) => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  t.true(status === 404)
})
