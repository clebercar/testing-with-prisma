import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError'

import { IUsersRepository } from '../repositories/contracts/UsersRepositoryContract'
import { User } from '../entities/User'

type Props = {
  name: string
  email: string
}

export class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async exec(props: Props) {
    const user = new User(props)

    const emailAlreadyExists = await this.usersRepository.findByEmail(
      user.props.email
    )

    if (emailAlreadyExists) throw new UserAlreadyExistsError(user.props.email)

    await this.usersRepository.create(user)

    return user
  }
}
