import {sequelize} from '../connection'
import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'
import { Stock } from '../types/interfaces'
import {ItemModel} from '@/db/models/item.model'

export class StockModel extends Model<InferAttributes<StockModel>, InferCreationAttributes<StockModel>> implements Stock {
    declare itemId: number;
    declare quantity: number;
    declare inStock: number;
    declare lastUpdate: Date;
    items: ItemModel[];
}
// todo добавить собственный id иначе джойновый запрос с вытаскиванием связанных данных из дочерней таблицы не отрабатывает
StockModel.init(
    {
        itemId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        inStock: {
            type: DataTypes.INTEGER,
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