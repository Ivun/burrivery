import test from 'ava'
import mockgoose from 'mockgoose'
import mongoose from '../../config/mongoose'
import { schema } from '.'

test.beforeEach(async (t) => {
  const mongo = new mongoose.Mongoose()
  await mockgoose(mongo)
  await mongo.connect('')
  const Test = mongo.model('Test', schema)
  const test = await Test.create({ title: 'test', price: 'test' })

  t.context = { ...t.context, Test, test }
})

test.cb.after.always((t) => {
  mockgoose.reset(t.end)
})

test('view', (t) => {
  const { test } = t.context
  const view = test.view()
  t.true(typeof view === 'object')
  t.true(view.id === test.id)
  t.true(view.title === test.title)
  t.true(view.price === test.price)
  t.truthy(view.createdAt)
  t.truthy(view.updatedAt)
})

test('full view', (t) => {
  const { test } = t.context
  const view = test.view(true)
  t.true(typeof view === 'object')
  t.true(view.id === test.id)
  t.true(view.title === test.title)
  t.true(view.price === test.price)
  t.truthy(view.createdAt)
  t.truthy(view.updatedAt)
})
