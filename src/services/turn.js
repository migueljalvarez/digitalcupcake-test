import Employee from '../models/employee'
import Turn from '../models/turn'
import AplicationError from '../utils/aplicationError'

const validateTimes = (time) => {
  const rgx = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/
  if (!time.match(rgx)) {
    throw new AplicationError('please enter the correct format HH:mm', 400)
  }
  return time
}
const insert = async (data) => {
  const newTurn = {
    ...data,
    startTime: validateTimes(data.startTime),
    endTime: validateTimes(data.endTime),
  }

  const turn = await Turn.create(newTurn)
  return turn
}
const findById = async (id, { withDeleted = false, ...query } = {}) => {
  let queryParameters = {}
  if (withDeleted) {
    queryParameters = { ...query, id }
  } else {
    queryParameters = { ...query, id, deleted: false }
  }
  const turn = await Turn.findOne({
    where: queryParameters,
    include: [{ model: Employee }],
  })
  return turn
}
const findAll = async ({
  withDeleted = false,
  onlyDeleted = false,
  page = 1,
  all = false,
  ...query
} = {}) => {
  let turns
  const options = {
    page,
    paginate: 25,
    where: query,
  }
  if (onlyDeleted) {
    options.where = { ...query, deleted: true }
    turns = await Turn.paginate(options)
    return turns
  }
  if (withDeleted) {
    turns = await Turn.paginate(options)
    return turns
  }
  if (all) {
    turns = await Turn.findAll(query)
    return turns
  }
  options.where = { ...query, deleted: false }
  turns = await Turn.paginate(options)
  return turns
}

const patch = async (id, { ...fields }) => {
  const turn = await findById(id, { deleted: false })
  if (turn) {
    const { startTime, endTime } = fields
    if (startTime) {
      fields.startTime = validateTimes(fields.startTime)
    }
    if (endTime) {
      fields.endTime = validateTimes(fields.endTime)
    }
    const patchedTurn = await turn.update({ ...fields })
    return patchedTurn
  } else {
    throw new AplicationError('Turn not found', 404)
  }
}

const restoreOne = async (id) => {
  const turn = await findById(id, { withDeleted: true })
  let response = null
  if (turn) {
    turn.deleted = false
    turn.startTime = validateTimes(turn.startTime)
    turn.endTime = validateTimes(turn.endTime)
    response = turn.save()
  } else {
    throw new AplicationError('Turn not found', 404)
  }
  return response
}
const deleteOne = async (id, { hardDelete = false } = {}) => {
  const turn = await findById(id, { withDeleted: true })
  let response = null
  if (turn) {
    if (hardDelete) {
      turn.destroy()
      response = { message: 'the turn has been successfully deleted' }
    } else {
      turn.deleted = true
      response = turn.save()
    }
  } else {
    throw new AplicationError('Turn not found', 404)
  }
  return response
}
export { insert, findById, findAll, patch, restoreOne, deleteOne }
