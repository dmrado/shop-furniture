import { sequelize } from '../connection'
import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize'

export interface BrandlDTO extends InferAttributes<BrandModel> {}

export class BrandModel extends Model<
    InferAttributes<BrandModel>,
    InferCreationAttributes<BrandModel>
> {
    declare id: CreationOptional<number>
    declare name: string
    declare description: string
    declare isActive: boolean
    declare isDeleted: boolean
}
// todo добавить для моделей брендов, коллекций, стран и стилей поле status со значением: active, moderate, deleted и преписать соотв функции здесь поменять isDeleted на status
BrandModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        sequelize,
        tableName: 'brands'
    }
)
