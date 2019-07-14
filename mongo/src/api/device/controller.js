import { success, notFound } from '../../services/response/'
import { Device } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Device.create(body)
    .then(device => device.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Device.find(query, select, cursor)
    .populate({
      path: 'connections',
      populate: {
        path: 'to',
        model: 'Device'
      }
    })
    .populate({
      path: 'connections',
      populate: {
        path: 'from',
        model: 'Device'
      }
    })
    .then(devices => devices.map(device => device.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Device.findById(params.id)
    .populate({
      path: 'connections',
      populate: {
        path: 'to',
        model: 'Device'
      }
    })
    .populate({
      path: 'connections',
      populate: {
        path: 'from',
        model: 'Device'
      }
    })
    .then(notFound(res))
    .then(device => (device ? device.view() : null))
    .then(success(res))
    .catch(next)

export const showByDid = ({ params }, res, next) =>
  Device.findOne({ dId: params.id })
    .populate({
      path: 'connections',
      populate: {
        path: 'to',
        model: 'Device'
      }
    })
    .populate({
      path: 'connections',
      populate: {
        path: 'from',
        model: 'Device'
      }
    })
    .then(notFound(res))
    .then(device => (device ? device.view() : null))
    .then(success(res))
    .catch(next)

export const update = (req, res, next) =>
  Device.findOneAndUpdate(
    {
      dId: req.params.id
    },
    { $set: req.body },
    { new: true, upsert: true }
  )
    .then(notFound(res))
    .then(success(res))
    .catch(next)

export const updateConnections = (req, res, next) =>
  Device.findByIdAndUpdate(req.params.id, { $push: req.body }, { new: true })
    .then(notFound(res))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Device.findById(params.id)
    .then(notFound(res))
    .then(device => (device ? device.remove() : null))
    .then(success(res, 204))
    .catch(next)
