import { Device } from '.'

let device

beforeEach(async () => {
  device = await Device.create({ dId: 'test', action: 'test', name: 'test', connections: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = device.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(device.id)
    expect(view.dId).toBe(device.dId)
    expect(view.action).toBe(device.action)
    expect(view.name).toBe(device.name)
    expect(view.connections).toBe(device.connections)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = device.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(device.id)
    expect(view.dId).toBe(device.dId)
    expect(view.action).toBe(device.action)
    expect(view.name).toBe(device.name)
    expect(view.connections).toBe(device.connections)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
