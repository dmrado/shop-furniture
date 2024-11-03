import {sequelize} from '../connection'
import { DataTypes, Model } from 'sequelize'
import { Color } from '../types/interfaces'

export class ColorModel extends Model<Color> implements Color {
    public id!: number;
    public isactive!: boolean;
    public colorcode!: string;
}

ColorModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        isactive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        colorcode: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'colors',
    }
)