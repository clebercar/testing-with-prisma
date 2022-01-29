export class InvalidEmailError extends Error {
  constructor() {
    super(`The email field is invalid.`)
    this.name = 'InvalidEmailError'
  }
}
