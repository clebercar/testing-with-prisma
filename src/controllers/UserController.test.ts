import request from 'supertest'

import { prisma } from '../config/prisma/client'
import { Application } from '../Application'

describe('Given the users resources', () => {
  const { app } = new Application()

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('POST /users', () => {
    afterEach(async () => {
      await prisma.user.deleteMany()
    })

    it('should be able to create new user', async () => {
      const response = await request(app).post('/users').send({
        name: 'John Doe',
        email: 'john@doe.com',
      })

      expect(response.status).toBe(201)

      const userInDatabase = await prisma.user.findUnique({
        where: { email: 'john@doe.com' },
      })

      expect(userInDatabase).toBeTruthy()
    })

    it('should be able to throw an error when the user is already registered', async () => {
      const data = {
        name: 'John Doe',
        email: 'john@doe.com',
      }

      await request(app).post('/users').send(data)

      const response = await request(app).post('/users').send(data)

      expect(response.status).toBe(400)
      expect(response.body.message).toBe(
        `The email "${data.email}" is already registered.`
      )
    })

    it('should be able to throw an error when the informed email is invalid', async () => {
      const data = {
        name: 'John Doe',
        email: 'johndoe.com',
      }

      await request(app).post('/users').send(data)

      const response = await request(app).post('/users').send(data)

      expect(response.status).toBe(400)
      expect(response.body.message).toBe('The email field is invalid.')
    })

    it(`should be able to throw an error when the informed name isn't valid or not filled`, async () => {
      const data = {
        name: 'John Doe',
        email: 'johndoe.com',
      }

      await request(app).post('/users').send(data)

      const response = await request(app).post('/users').send(data)

      expect(response.status).toBe(400)
      expect(response.body.message).toBe('The email field is invalid.')
    })
  })
})
