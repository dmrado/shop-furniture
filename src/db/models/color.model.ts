import {sequelize} from '../connection'
import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'

export interface ColorDTO extends InferAttributes<ColorModel> {}

export class ColorModel extends Model<InferAttributes<ColorModel>, InferCreationAttributes<ColorModel>> {
    declare id: CreationOptional<number>
    declare code: string
    declare name: string
    declare isActive: boolean
}

ColorModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: true,
        },
        code: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: 'colors',
    }
)