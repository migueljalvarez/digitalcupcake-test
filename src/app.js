import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import logger from 'morgan'
import path from 'path'
import api from './routes/index.js'

const app = express()

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
// view engine setup
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  bodyParser.json({
    limit: 50,
  }),
)

app.use(
  bodyParser.urlencoded({
    limit: 50,
    extended: false,
  }),
)

app.use('/api/v1', api)

export { app }
