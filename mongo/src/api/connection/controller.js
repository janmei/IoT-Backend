import { success, notFound } from '../../services/response/'
import { Connection } from '.'
import Devices from '../device/model'

export const create = ({ bodymen: { body } }, res, next) =>
  Connection.create(body)
    .then(connection => connection.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Connection.find(query, select, cursor)
    .populate('to', 'dId id')
    .populate('from', 'dId id')
    .then(connections => connections.map(connection => connection.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Connection.findById(params.id)
    .populate('to', 'dId id')
    .populate('from', 'dId id')
    .then(notFound(res))
    .then(connection => (connection ? connection.view() : null))
    .then(success(res))
    .catch(next)

export const update = (req, res, next) =>
  View.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(notFound(res))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) => {
  Devices.updateOne(
    { connections: { $in: [params.id] } },
    {
      $pull: { connections: params.id }
    }
  )
    .then(notFound(res))
    .catch(next)
  Connection.findById(params.id)
    .then(notFound(res))
    .then(connection => (connection ? connection.remove() : null))
    .then(success(res, 204))
    .catch(next)
}
