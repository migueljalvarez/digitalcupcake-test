import {
  insert,
  findById,
  findAll,
  patch,
  restoreOne,
  deleteOne,
} from '../services/employee'
import asyncWrap from '../utils/asyncWrap'

const create = asyncWrap(async (req, res) => {
  const employee = await insert(req.body)
  res.json(employee)
})

const find = asyncWrap(async (req, res) => {
  if (req.params.id) {
    const employee = await findById(req.params.id, {
      ...req.query,
      withDeleted: req.query.withDeleted === 'true' ? true : false,
    })
    res.json(employee)
  } else {
    const employees = await findAll({
      ...req.query,
      withDeleted: req.query.withDeleted === 'true' ? true : false,
      onlyDeleted: req.query.onlyDeleted === 'true' ? true : false,
      all: req.query.all === 'true' ? true : false,
    })
    res.json(employees)
  }
})

const update = asyncWrap(async (req, res) => {
  const employee = await patch(req.params.id, { ...req.body })
  res.json(employee)
})

const restore = asyncWrap(async (req, res) => {
  const employee = await restoreOne(req.params.id)
  res.json(employee)
})

const deleteOrDisable = asyncWrap(async (req, res) => {
  const employee = await deleteOne(req.params.id, {
    hardDelete: req.query.hardDelete === 'true' ? true : false,
  })
  res.json(employee)
})

export default { create, find, restore, update, deleteOrDisable }
