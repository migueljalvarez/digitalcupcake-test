import {
  insert,
  findById,
  findAll,
  patch,
  restoreOne,
  deleteOne,
} from '../services/turn'
import asyncWrap from '../utils/asyncWrap'

const create = asyncWrap(async (req, res) => {
  const turn = await insert(req.body)
  res.json(turn)
})

const find = asyncWrap(async (req, res) => {
  if (req.params.id) {
    const turn = await findById(req.params.id, {
      ...req.query,
      withDeleted: req.query.withDeleted === 'true' ? true : false,
    })
    res.json(turn)
  } else {
    const turns = await findAll({
      ...req.query,
      withDeleted: req.query.withDeleted === 'true' ? true : false,
      onlyDeleted: req.query.onlyDeleted === 'true' ? true : false,
      all: req.query.all === 'true' ? true : false,
    })
    res.json(turns)
  }
})

const update = asyncWrap(async (req, res) => {
  const turn = await patch(req.params.id, { ...req.body })
  res.json(turn)
})

const restore = asyncWrap(async (req, res) => {
  const turn = await restoreOne(req.params.id)
  res.json(turn)
})

const deleteOrDisable = asyncWrap(async (req, res) => {
  const turn = await deleteOne(req.params.id, {
    hardDelete: req.query.hardDelete === 'true' ? true : false,
  })
  res.json(turn)
})

export default { create, find, restore, update, deleteOrDisable }
