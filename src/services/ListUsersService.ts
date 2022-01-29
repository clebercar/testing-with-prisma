import { IUsersRepository } from '../repositories/contracts/UsersRepositoryContract'

export class ListUsersService {
  constructor(private usersRepository: IUsersRepository) {}

  public async exec() {
    return this.usersRepository.findAll()
  }
}
