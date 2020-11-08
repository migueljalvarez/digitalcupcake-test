import Sequelize from 'sequelize'
import mysql from 'mysql2'
import config from '../config/config'
const { NODE_ENV, DB_HOSTNAME, DIALECT } = process.env
let dbConnectionSingletonPromise

const sequelizeIntances = () => {
  if (dbConnectionSingletonPromise) {
    return dbConnectionSingletonPromise
  }
  const { host, port, database, user, password } = config.db
  if (NODE_ENV === 'local') {
    const conn = mysql.createConnection({ host, port, user, password })
    conn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)
    dbConnectionSingletonPromise = new Sequelize(database, user, password, {
      host: host,
      port: port,
      dialect: DIALECT,
    })
  } else {
    dbConnectionSingletonPromise = new Sequelize(database, user, password, {
      host: DB_HOSTNAME,
      dialect: DIALECT,
    })
  }

  return dbConnectionSingletonPromise
}
const sequelize = sequelizeIntances()

export default sequelize
