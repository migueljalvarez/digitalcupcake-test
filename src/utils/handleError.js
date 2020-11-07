import { red } from 'kleur'
import AplicationError from './aplicationError'

const STATUS_CODES = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  408: 'Request Time-out',
  409: 'Conflict',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Time-out',
}

// eslint-disable-next-line no-unused-vars
export const handleError = (err, req, res, next) => {
  console.error(err.stack)
  const { message, name, code, errorCode } = err
  let statusCode
  let error

  if (err instanceof AplicationError || err.name === 'CastError') {
    statusCode = err.status || 400
    error = { code: errorCode, message, name }
  } else {
    statusCode = 500
    error = { code, message, name }
  }
  const responseName = STATUS_CODES[statusCode] || 'Unknown'
  // TODO: Implement logger errors
  res.status(statusCode).send({ ...error, responseName })
}

// unhandleRejection and uncaughtException
export const handleFatalError = (err) => {
  console.error(red().bold(err.message))
  throw new Error('FATAL_ERROR')
}

export const handleNotFoundError = (req, res) => {
  res
    .status(404)
    .json({ code: 404, name: STATUS_CODES[404], message: 'Route not found' })
}
