import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Device, { schema } from './model'

const router = new Router()
const { dId, action, name, connections } = schema.tree

/**
 * @api {post} /devices Create device
 * @apiName CreateDevice
 * @apiGroup Device
 * @apiParam dId Device's dId.
 * @apiParam action Device's action.
 * @apiParam name Device's name.
 * @apiParam connections Device's connections.
 * @apiSuccess {Object} device Device's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Device not found.
 */
router.post('/',
  body({ dId, action, name, connections }),
  create)

/**
 * @api {get} /devices Retrieve devices
 * @apiName RetrieveDevices
 * @apiGroup Device
 * @apiUse listParams
 * @apiSuccess {Object[]} devices List of devices.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /devices/:id Retrieve device
 * @apiName RetrieveDevice
 * @apiGroup Device
 * @apiSuccess {Object} device Device's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Device not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /devices/:id Update device
 * @apiName UpdateDevice
 * @apiGroup Device
 * @apiParam dId Device's dId.
 * @apiParam action Device's action.
 * @apiParam name Device's name.
 * @apiParam connections Device's connections.
 * @apiSuccess {Object} device Device's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Device not found.
 */
router.put('/:id',
  body({ dId, action, name, connections }),
  update)

/**
 * @api {delete} /devices/:id Delete device
 * @apiName DeleteDevice
 * @apiGroup Device
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Device not found.
 */
router.delete('/:id',
  destroy)

export default router
