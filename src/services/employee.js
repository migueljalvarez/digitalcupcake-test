import Employee from '../models/employee'
import Turn from '../models/turn'
import AplicationError from '../utils/aplicationError'

const insert = async (data) => {
  const employee = await Employee.create(data)
  return employee
}
const findById = async (id, { withDeleted = false, ...query } = {}) => {
  let queryParameters = {}
  if (withDeleted) {
    queryParameters = { ...query, id }
  } else {
    queryParameters = { ...query, id, deleted: false }
  }
  const employee = await Employee.findOne({
    where: queryParameters,
    include: [{ model: Turn }],
  })
  return employee
}
const findAll = async ({
  withDeleted = false,
  onlyDeleted = false,
  all = false,
  page = 1,
  ...query
} = {}) => {
  let employees
  const options = {
    page,
    paginate: 25,
    where: query,
  }
  if (onlyDeleted) {
    options.where = { ...query, deleted: true }
    employees = await Employee.paginate(options)
    return employees
  }
  if (withDeleted) {
    employees = await Employee.paginate(options)
    return employees
  }
  if (all) {
    employees = await Employee.findAll(query)
    return employees
  }
  options.where = { ...query, deleted: false }
  employees = await Employee.paginate(options)
  return employees
}

const patch = async (id, { ...fields }) => {
  const employee = await findById(id, { deleted: false })
  if (employee) {
    const patchedEmployee = await employee.update({ ...fields })
    return patchedEmployee
  } else {
    throw new AplicationError('Employee not found', 404)
  }
}

const restoreOne = async (id) => {
  const employee = await findById(id, { withDeleted: true })
  let response = null
  if (employee) {
    employee.deleted = false
    response = employee.save()
  } else {
    throw new AplicationError('Employee not found', 404)
  }

  return response
}
const deleteOne = async (id, { hardDelete = false } = {}) => {
  const employee = await findById(id, { withDeleted: true })
  let response = null
  if (employee) {
    if (hardDelete) {
      employee.destroy()
      response = { message: 'the employee has been successfully deleted' }
    } else {
      employee.deleted = true
      response = employee.save()
    }
  } else {
    throw new AplicationError('Employee not found', 404)
  }
  return response
}
export { insert, findById, findAll, patch, restoreOne, deleteOne }
