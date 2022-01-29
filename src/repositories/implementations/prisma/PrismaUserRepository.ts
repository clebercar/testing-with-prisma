import { IUsersRepository } from '../../contracts/UsersRepositoryContract'
import { UserMapper } from '../../../mappers/UserMapper'
import { User } from '../../../entities/User'
import { prisma } from '../../../config/prisma/client'

export class PrismaUserRepository implements IUsersRepository {
  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany()

    return users.map(UserMapper.toDomain)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) return null

    return UserMapper.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const data = UserMapper.toDto(user)

    await prisma.user.create({ data })
  }
}
