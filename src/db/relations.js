import Employee from '../models/employee'
import Turn from '../models/turn'

Employee.belongsTo(Turn)
Turn.hasMany(Employee)
