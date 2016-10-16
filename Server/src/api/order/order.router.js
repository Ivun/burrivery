import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy,addProduct,requireOrder,removeProduct,activeOrders } from './order.controller'
import {acceptOrder} from './courier/order.courier.controller'
import {pay4Order} from './client/order.client.controller'
import { basic, master, session } from '../../services/passport'

import { schema,orderItemSchema } from './order.model'
export Order, { schema } from './order.model'

const router = new Router()
const { status, courierId, clientId, items } = schema.tree;
const {productId, quantity} = orderItemSchema.tree;

/**
 * @api {post} /orders Create order
 * @apiName CreateOrder
 * @apiGroup Order
 * @apiParam status Order's status.
 * @apiParam courierId Order's courierId.
 * @apiParam clientId Order's clientId.
 * @apiParam items Order's items.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
router.post('/',
  session({ required: true }),
  body(),
  query(),
  create)

/**
 * @api {get} /orders Retrieve orders
 * @apiName RetrieveOrders
 * @apiGroup Order
 * @apiUse listParams
 * @apiSuccess {Object[]} orders List of orders.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

router.get('/active',
  session({required:true}),
  activeOrders)

/**
 * @api {get} /orders/:id Retrieve order
 * @apiName RetrieveOrder
 * @apiGroup Order
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /orders/:id Update order
 * @apiName UpdateOrder
 * @apiGroup Order
 * @apiParam status Order's status.
 * @apiParam courierId Order's courierId.
 * @apiParam clientId Order's clientId.
 * @apiParam items Order's items.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
router.put('/:id',
  body({ status, courierId, clientId, items }),
  update)

/**
 * @api {delete} /orders/:id Delete order
 * @apiName DeleteOrder
 * @apiGroup Order
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Order not found.
 */
router.delete('/:id',
  destroy)

router.post('/require',
  session({required:true}),
  requireOrder);


router.post('/:id/products/:productId/add',
  session({required: true}),
  addProduct
);

router.post('/:id/products/:productId/remove',
  session({required: true}),
  removeProduct
);


router.post('/:id/pay',
  session({required:true, roles:['user']}),
  pay4Order);


router.post('/:id/accept',
  session({required:true, roles:['courier']}),
  acceptOrder);

export default router
