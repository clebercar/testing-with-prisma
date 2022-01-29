import express, { Express } from 'express'

import routes from './routes'

export class Application {
  readonly app: Express

  constructor() {
    this.app = express()
    this.app.use(express.json())
    this.app.use(routes)
  }

  server() {
    const port = process.env.PORT || 80

    this.app.listen(port, () => {
      console.log(`⚡ Server running on port ${port}`)
    })
  }
}
