export class InvalidNameError extends Error {
  constructor() {
    super(`The name field is invalid.`)
    this.name = 'InvalidNameError'
  }
}
