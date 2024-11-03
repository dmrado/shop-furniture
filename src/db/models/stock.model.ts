import {sequelize} from '../connection'
import { DataTypes, Model } from 'sequelize'
import { Stock } from '../types/interfaces'

export class StockModel extends Model<Stock> implements Stock {
    public itemid!: number;
    public quantity!: number;
    public instock!: boolean;
    public lastupdate!: Date;
}

StockModel.init(
    {
        itemid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        instock: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        lastupdate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'stocks',
    }
)