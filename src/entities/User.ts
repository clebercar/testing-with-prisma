import { InvalidEmailError } from './errors/user/InvalidEmailError'
import { InvalidNameError } from './errors/user/InvalidNameError'

type UserProps = {
  name: string
  email: string
}

export class User {
  constructor(public readonly props: UserProps) {
    this.setName(props.name)
    this.setEmail(props.email)
  }

  setName(name: string) {
    if (!name?.length && /^[a-zA-Z]+$/.test(name)) throw new InvalidNameError()

    this.props.name = name
  }

  setEmail(email: string) {
    if (!email || email.trim().length > 255) throw new InvalidEmailError()

    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!regex.test(email)) throw new InvalidEmailError()

    this.props.email = email
  }
}
