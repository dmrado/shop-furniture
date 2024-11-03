import {sequelize} from '../connection'
import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'
import { Order } from '../types/interfaces'
import {AddressModel} from "@/db/models/address.model"
import {UserModel} from "@/db/models/user.model"

export class OrderModel extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> implements Order {
    declare id: number;
    declare userId: number;
    declare addressId: number;
    declare orderDate: Date;
    declare cartPrice: number;
}

OrderModel.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        addressId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cartPrice: {
            type: DataTypes.DOUBLE(10, 2),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'orders',
    }
)

OrderModel.belongsTo(UserModel, {
    // foreignKey: 'userId'
})
OrderModel.belongsTo(AddressModel,
    // { foreignKey: 'addressId' }
)