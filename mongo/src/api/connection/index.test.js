import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Connection } from '.'

const app = () => express(apiRoot, routes)

let connection

beforeEach(async () => {
  connection = await Connection.create({})
})

test('POST /connections 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ from: 'test', to: 'test', payload: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.from).toEqual('test')
  expect(body.to).toEqual('test')
  expect(body.payload).toEqual('test')
})

test('GET /connections 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /connections/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${connection.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(connection.id)
})

test('GET /connections/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /connections/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${connection.id}`)
    .send({ from: 'test', to: 'test', payload: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(connection.id)
  expect(body.from).toEqual('test')
  expect(body.to).toEqual('test')
  expect(body.payload).toEqual('test')
})

test('PUT /connections/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ from: 'test', to: 'test', payload: 'test' })
  expect(status).toBe(404)
})

test('DELETE /connections/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${connection.id}`)
  expect(status).toBe(204)
})

test('DELETE /connections/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
