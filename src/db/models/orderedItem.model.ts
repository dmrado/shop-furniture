import {sequelize} from '../connection'
import { DataTypes, Model } from 'sequelize'
import { OrderedItem } from '../types/interfaces'

export class OrderedItemModel extends Model<OrderedItem> implements OrderedItem {
    public order!: number;
    public item!: number;
    public quantity!: number;
    public status!: number;
}

OrderedItemModel.init(
    {
        order: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        item: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'ordered_items',
    }
)

