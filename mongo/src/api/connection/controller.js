import { success, notFound } from '../../services/response/'
import { Connection } from '.'

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

export const update = ({ bodymen: { body }, params }, res, next) =>
  Connection.findById(params.id)
    .then(notFound(res))
    .then(connection =>
      connection ? Object.assign(connection, body).save() : null
    )
    .then(connection => (connection ? connection.view(true) : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Connection.findById(params.id)
    .then(notFound(res))
    .then(connection => (connection ? connection.remove() : null))
    .then(success(res, 204))
    .catch(next)
