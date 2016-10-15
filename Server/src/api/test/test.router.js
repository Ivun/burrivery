import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './test.controller'
import { schema } from './test.model'
export Test, { schema } from './test.model'

const router = new Router()
const { title, price } = schema.tree

/**
 * @api {post} /tests Create test
 * @apiName CreateTest
 * @apiGroup Test
 * @apiParam title Test's title.
 * @apiParam price Test's price.
 * @apiSuccess {Object} test Test's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test not found.
 */
router.post('/',
  body({ title, price }),
  create)

/**
 * @api {get} /tests Retrieve tests
 * @apiName RetrieveTests
 * @apiGroup Test
 * @apiUse listParams
 * @apiSuccess {Object[]} tests List of tests.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /tests/:id Retrieve test
 * @apiName RetrieveTest
 * @apiGroup Test
 * @apiSuccess {Object} test Test's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /tests/:id Update test
 * @apiName UpdateTest
 * @apiGroup Test
 * @apiParam title Test's title.
 * @apiParam price Test's price.
 * @apiSuccess {Object} test Test's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test not found.
 */
router.put('/:id',
  body({ title, price }),
  update)

/**
 * @api {delete} /tests/:id Delete test
 * @apiName DeleteTest
 * @apiGroup Test
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Test not found.
 */
router.delete('/:id',
  destroy)

export default router
