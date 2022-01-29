import { User as PersistenceUser } from '@prisma/client'

import { User } from '../entities/User'

export class UserMapper {
  static toDomain(raw: PersistenceUser): User {
    return new User({ name: raw.name, email: raw.email })
  }

  static toDto(user: User) {
    return user.props
  }
}
