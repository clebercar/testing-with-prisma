import { Request, Response } from 'express'

import { InvalidEmailError } from '../entities/errors/user/InvalidEmailError'
import { InvalidNameError } from '../entities/errors/user/InvalidNameError'
import { PrismaUserRepository } from '../repositories/implementations/prisma/PrismaUserRepository'
import { ListUsersService } from '../services/ListUsersService'
import { CreateUserService } from '../services/CreateUserService'
import { UserAlreadyExistsError } from '../services/errors/UserAlreadyExistsError'

export class UserController {
  public static async index(request: Request, response: Response) {
    try {
      const listUsersService = new ListUsersService(new PrismaUserRepository())
      const users = await listUsersService.exec()

      response.json(users)
    } catch (error) {
      switch (error.constructor) {
        default:
          response.status(500).json({ message: 'Internal server error.' })
      }
    }
  }

  public static async create(request: Request, response: Response) {
    try {
      const { name, email } = request.body

      const createUser = new CreateUserService(new PrismaUserRepository())
      const user = await createUser.exec({ name, email })

      response.status(201).json(user)
    } catch (error) {
      switch (error.constructor) {
        case InvalidNameError:
        case InvalidEmailError:
        case UserAlreadyExistsError:
          response.status(400).json({ message: error.message })
          break
        default:
          response.status(500).json({ message: 'Internal server error.' })
      }
    }
  }
}
