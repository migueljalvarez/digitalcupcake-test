import http from 'http'
import { app } from './app'
import config from './config/config'
import { handleFatalError } from './utils/handleError'
import sequelize from './db/index'
import './db/relations'

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

const { database, host } = config.db

sequelize
  .authenticate()
  .then(() => {
    sequelize.sync({ force: false }).then(() => {
      http.createServer(app).listen(config.app.port, () => {
        console.log(`[Database:] connection open to ${host}/${database}`)
        console.log(`\u{1F525} App listening on port ${config.app.port}`)
      })
    })
  })
  .catch((err) => {
    console.error(err)
    throw new Error('PROBLEM_IN_DB')
  })
