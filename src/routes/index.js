import express from 'express'
import TurnController from '../controllers/turn'
import EmployeeController from '../controllers/employee'
const router = express.Router()
router.get('/', (req, res) => {
  res.send('Api is OK')
})
// Turns
router.post('/turn', TurnController.create)
router.get('/turn/:id?', TurnController.find)
router.patch('/turn/restore/:id', TurnController.restore)
router.patch('/turn/:id', TurnController.update)
router.delete('/turn/:id', TurnController.deleteOrDisable)

// Employees
router.post('/employee', EmployeeController.create)
router.get('/employee/:id?', EmployeeController.find)
router.patch('/employee/restore/:id', EmployeeController.restore)
router.patch('/employee/:id', EmployeeController.update)
router.delete('/employee/:id', EmployeeController.deleteOrDisable)

export default router
