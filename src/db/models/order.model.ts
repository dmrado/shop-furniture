import { sequelize } from '../connection'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
// import {AddressModel} from "@/db/models"
// import {OuruserModel} from "@/db/models"

export class OrderModel extends Model<InferAttributes<OrderModel>, InferCreationAttributes<OrderModel>> {
    declare id: CreationOptional<number>
    declare userId: string
    declare addressId: number
    declare comment: string
    declare orderDate: Date
    declare deliveryDate: Date
    declare cartPrice: number
}

OrderModel.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID, // Если id в таблице users тоже UUID
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
        deliveryDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cartPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'orders',
    }
)
//
// OrderModel.belongsTo(OuruserModel, {
//     // foreignKey: 'userId'
// })
// OrderModel.belongsTo(AddressModel,
//     // { foreignKey: 'addressId' }
// )
