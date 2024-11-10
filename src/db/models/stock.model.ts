import {sequelize} from '../connection'
import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'
import { Stock } from '../types/interfaces'
import {ProductModel} from '@/db/models/product.model'

export class StockModel extends Model<InferAttributes<StockModel>, InferCreationAttributes<StockModel>> implements Stock {
    declare itemId: number;
    declare quantity: number;
    declare inStock: number;
    declare lastUpdate: Date;
}

StockModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        inStock: {
        type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        lastUpdate: {
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