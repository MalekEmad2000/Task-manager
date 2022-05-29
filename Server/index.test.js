import { request } from 'https'
import supertest from 'supertest'
import app from './index'

describe('POST /api/registerUser', () => {
  // serever save user name and password to db
  // response code should be 200
  test('should respond with a 200 status code', () => {
    const response = await request(app).post('/api/registerUser').send({
      Username: 'username',
      password: 'password',
    })
    expect(response.statusCode).toBe(200)
  })
})

describe('when the username and password is missing', () => {
  // should respond with a status code 404
})
