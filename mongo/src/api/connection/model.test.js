import { Connection } from '.'

let connection

beforeEach(async () => {
  connection = await Connection.create({ from: 'test', to: 'test', payload: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = connection.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(connection.id)
    expect(view.from).toBe(connection.from)
    expect(view.to).toBe(connection.to)
    expect(view.payload).toBe(connection.payload)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = connection.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(connection.id)
    expect(view.from).toBe(connection.from)
    expect(view.to).toBe(connection.to)
    expect(view.payload).toBe(connection.payload)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
