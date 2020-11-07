import sequelizePaginate from 'sequelize-paginate'
import { DataTypes, Model } from 'sequelize'
import sequelize from '../db/index'

class Turn extends Model {}
Turn.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    startTime: { type: DataTypes.TIME, allowNull: false },
    endTime: { type: DataTypes.TIME, allowNull: false },
    sun: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    mon: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    tues: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    wed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    thurs: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    fri: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    sat: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Turn',
  },
)
sequelizePaginate.paginate(Turn)
export default Turn
