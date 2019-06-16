import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import {
  create,
  index,
  show,
  update,
  destroy,
  addToConnectionList
} from './controller'
import { schema } from './model'
export Connection, { schema } from './model'

const router = new Router()
const { from, to, payload } = schema.tree

/**
 * @api {post} /connections Create connection
 * @apiName CreateConnection
 * @apiGroup Connection
 * @apiParam from Connection's from.
 * @apiParam to Connection's to.
 * @apiParam payload Connection's payload.
 * @apiSuccess {Object} connection Connection's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Connection not found.
 */
router.post('/', body({ from, to, payload }), create)

/**
 * @api {get} /connections Retrieve connections
 * @apiName RetrieveConnections
 * @apiGroup Connection
 * @apiUse listParams
 * @apiSuccess {Object[]} connections List of connections.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', query(), index)

/**
 * @api {get} /connections/:id Retrieve connection
 * @apiName RetrieveConnection
 * @apiGroup Connection
 * @apiSuccess {Object} connection Connection's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Connection not found.
 */
router.get('/:id', show)

/**
 * @api {put} /connections/:id Update connection
 * @apiName UpdateConnection
 * @apiGroup Connection
 * @apiParam from Connection's from.
 * @apiParam to Connection's to.
 * @apiParam payload Connection's payload.
 * @apiSuccess {Object} connection Connection's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Connection not found.
 */
router.put('/:id', body({ from, to, payload }), update)

/**
 * @api {delete} /connections/:id Delete connection
 * @apiName DeleteConnection
 * @apiGroup Connection
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Connection not found.
 */
router.delete('/:id', destroy)

export default router
