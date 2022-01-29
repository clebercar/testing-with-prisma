/**
 * Reference https://jestjs.io/pt-BR/docs/configuration#testenvironment-string
 */
const { Client } = require('pg')

const NodeEnvironment = require('jest-environment-node')

const crypto = require('crypto')

require('dotenv').config({ node_env: 'test', silent: true })

const util = require('util')
const { exec } = require('child_process')

const execSync = util.promisify(exec)

const prismaBinary = './node_modules/.bin/prisma'

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)

    // Generate a unique schema identifier for this test context
    this.schema = `test_${crypto.randomUUID()}`

    // Generate the pg connection string for the test schema
    this.connectionString = `${process.env.DATABASE_URL}?schema=${this.schema}`
  }

  async setup() {
    // Set the required environment variable to contain the connection string
    // to our database test schema
    process.env.DATABASE_URL = this.connectionString
    this.global.process.env.DATABASE_URL = this.connectionString

    // Run the migrations to ensure our schema has the required structure
    await execSync(`${prismaBinary} migrate deploy`)

    return super.setup()
  }

  async teardown() {
    // Drop the schema after the tests have completed
    const client = new Client({
      connectionString: this.connectionString,
    })

    await client.connect()
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`)
    await client.end()
  }
}

module.exports = PrismaTestEnvironment
