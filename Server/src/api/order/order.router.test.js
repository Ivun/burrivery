import test from 'ava'
import request from 'supertest-as-promised'
import mockgoose from 'mockgoose'
import express from '../../config/express'
import mongoose from '../../config/mongoose'
import routes, { Order } from '.'

const app = () => express(routes)

test.before(async (t) => {
  await mockgoose(mongoose)
  await mongoose.connect('')
})

test.beforeEach(async (t) => {
  const order = await Order.create({})
  t.context = { ...t.context, order }
})

test.afterEach.always(async (t) => {
  await Order.remove()
})

test.serial('POST /orders 201', async (t) => {
  const { status, body } = await request(app())
    .post('/')
    .send({ status: 'test', courierId: 'test', clientId: 'test', items: 'test' })
  t.true(status === 201)
  t.true(typeof body === 'object')
  t.true(body.status === 'test')
  t.true(body.courierId === 'test')
  t.true(body.clientId === 'test')
  t.true(body.items === 'test')
})

test.serial('GET /orders 200', async (t) => {
  const { status, body } = await request(app())
    .get('/')
  t.true(status === 200)
  t.true(Array.isArray(body))
})

test.serial('GET /orders/:id 200', async (t) => {
  const { order } = t.context
  const { status, body } = await request(app())
    .get(`/${order.id}`)
  t.true(status === 200)
  t.true(typeof body === 'object')
  t.true(body.id === order.id)
})

test.serial('GET /orders/:id 404', async (t) => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  t.true(status === 404)
})

test.serial('PUT /orders/:id 200', async (t) => {
  const { order } = t.context
  const { status, body } = await request(app())
    .put(`/${order.id}`)
    .send({ status: 'test', courierId: 'test', clientId: 'test', items: 'test' })
  t.true(status === 200)
  t.true(typeof body === 'object')
  t.true(body.id === order.id)
  t.true(body.status === 'test')
  t.true(body.courierId === 'test')
  t.true(body.clientId === 'test')
  t.true(body.items === 'test')
})

test.serial('PUT /orders/:id 404', async (t) => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ status: 'test', courierId: 'test', clientId: 'test', items: 'test' })
  t.true(status === 404)
})

test.serial('DELETE /orders/:id 204', async (t) => {
  const { order } = t.context
  const { status } = await request(app())
    .delete(`/${order.id}`)
  t.true(status === 204)
})

test.serial('DELETE /orders/:id 404', async (t) => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  t.true(status === 404)
})
