import { sequelize } from '../connection'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { Color } from '../types/interfaces'

export class ColorModel extends Model<InferAttributes<ColorModel>, InferCreationAttributes<ColorModel>> {
    declare id: CreationOptional<number>;
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