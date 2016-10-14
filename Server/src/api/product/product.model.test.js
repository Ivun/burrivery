import test from 'ava'
import mockgoose from 'mockgoose'
import mongoose from '../../config/mongoose'
import { schema } from '.'

test.beforeEach(async (t) => {
  const mongo = new mongoose.Mongoose()
  await mockgoose(mongo)
  await mongo.connect('')
  const Product = mongo.model('Product', schema)
  const product = await Product.create({})

  t.context = { ...t.context, Product, product }
})

test.cb.after.always((t) => {
  mockgoose.reset(t.end)
})

test('view', (t) => {
  const { product } = t.context
  const view = product.view()
  t.true(typeof view === 'object')
  t.true(view.id === product.id)
  t.truthy(view.createdAt)
  t.truthy(view.updatedAt)
})

test('full view', (t) => {
  const { product } = t.context
  const view = product.view(true)
  t.true(typeof view === 'object')
  t.true(view.id === product.id)
  t.truthy(view.createdAt)
  t.truthy(view.updatedAt)
})
