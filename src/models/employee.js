import sequelizePaginate from 'sequelize-paginate'
import { DataTypes, Model } from 'sequelize'
import sequelize from '../db/index'

class Employee extends Model {}
Employee.init(
  {
    documentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'ci cannot be an empty string. please enter a valid ci',
        },
      },
    },
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Employee',
  },
)
sequelizePaginate.paginate(Employee)
export default Employee
