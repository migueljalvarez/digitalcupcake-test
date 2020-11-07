import Sequelize from 'sequelize'
import config from '../config/config'
const { NODE_ENV, DB_HOSTNAME, DIALECT } = process.env
let dbConnectionSingletonPromise

const sequelizeIntances = () => {
  if (dbConnectionSingletonPromise) {
    return dbConnectionSingletonPromise
  }

  if (NODE_ENV === 'local') {
    dbConnectionSingletonPromise = new Sequelize(
      config.db.database,
      config.db.username,
      config.db.password,
      {
        host: config.db.host,
        port: config.db.port,
        dialect: DIALECT,
      },
    )
  } else {
    dbConnectionSingletonPromise = new Sequelize(
      config.db.database,
      config.db.username,
      config.db.password,
      {
        host: DB_HOSTNAME,
        dialect: DIALECT,
      },
    )
  }

  return dbConnectionSingletonPromise
}
const sequelize = sequelizeIntances()

export default sequelize
