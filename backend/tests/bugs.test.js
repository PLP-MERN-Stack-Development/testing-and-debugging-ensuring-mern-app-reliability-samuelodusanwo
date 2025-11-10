const request = require('supertest')
const app = require('../server')
const Bug = require('../models/Bug')

describe('Bugs API', () => {
  beforeEach(async () => {
    await Bug.deleteMany({})
  })

  test('GET /api/bugs returns all bugs', async () => {
    const bug = await Bug.create({
      title: 'Test Bug',
      description: 'Test Description',
      reporter: 'Test User'
    })

    const response = await request(app)
      .get('/api/bugs')
      .expect(200)

    expect(response.body.data).toHaveLength(1)
    expect(response.body.data[0].title).toBe('Test Bug')
  })
})