import dotenv from 'dotenv'
dotenv.config({ silent: true })

const {
  APP_PORT: port = 3000,
  DB_USERNAME: username = 'root',
  DB_PASSWORD: passwordDb = 'example',
  DB_DATABASE: db = 'dc-test',
  DB_PORT: dbPort = 3306,
} = process.env

const config = {
  app: {
    port,
  },
  db: {
    host: 'localhost',
    user: username,
    password: passwordDb,
    database: db,
    port: dbPort,
  },
}

export default config
