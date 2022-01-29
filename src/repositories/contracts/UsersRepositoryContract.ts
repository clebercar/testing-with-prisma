import { User } from '../../entities/User'

export interface IUsersRepository {
  create(user: User): Promise<void>
  findAll(): Promise<User[]>
  findByEmail(email: string): Promise<User>
}
