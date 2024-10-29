import {sequelize} from '../connection'
import { DataTypes, Model } from 'sequelize'
import { Order } from '../types/models'

class OrderModel extends Model<Order> implements Order {
    public id!: number;
    public userid!: number;
    public adres!: number;
    public orderdate!: Date;
    public cartprice!: number;
}

OrderModel.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        adres: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        orderdate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cartprice: {
            type: DataTypes.DOUBLE(10, 2),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'orders',
    }
);

export default OrderModel