import {sequelize} from '../connection'
import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'
import { Color } from '../types/interfaces'

export class ColorModel extends Model<InferAttributes<ColorModel>, InferCreationAttributes<ColorModel>> implements Color {
    declare id: number;
    declare isActive: boolean;
    declare colorCode: string;
}

ColorModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        colorCode: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'colors',
    }
)