import test from 'ava'
import mockgoose from 'mockgoose'
import mongoose from '../../config/mongoose'
import { schema } from '.'

test.beforeEach(async (t) => {
  const mongo = new mongoose.Mongoose()
  await mockgoose(mongo)
  await mongo.connect('')
  const Order = mongo.model('Order', schema)
  const order = await Order.create({ status: 'test', courierId: 'test', clientId: 'test', items: 'test' })

  t.context = { ...t.context, Order, order }
})

test.cb.after.always((t) => {
  mockgoose.reset(t.end)
})

test('view', (t) => {
  const { order } = t.context
  const view = order.view()
  t.true(typeof view === 'object')
  t.true(view.id === order.id)
  t.true(view.status === order.status)
  t.true(view.courierId === order.courierId)
  t.true(view.clientId === order.clientId)
  t.true(view.items === order.items)
  t.truthy(view.createdAt)
  t.truthy(view.updatedAt)
})

test('full view', (t) => {
  const { order } = t.context
  const view = order.view(true)
  t.true(typeof view === 'object')
  t.true(view.id === order.id)
  t.true(view.status === order.status)
  t.true(view.courierId === order.courierId)
  t.true(view.clientId === order.clientId)
  t.true(view.items === order.items)
  t.truthy(view.createdAt)
  t.truthy(view.updatedAt)
})
