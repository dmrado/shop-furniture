import { sequelize } from '../connection'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { OrderedProducts } from '../types/interfaces'
// import {OrderModel} from "@/db/models";

export class OrderedProductsModel extends Model<InferAttributes<OrderedProductsModel>, InferCreationAttributes<OrderedProductsModel>> {
    declare id: CreationOptional<number>
    declare orderId: number
    declare product: number
    declare quantity: number
    declare status: number
}

OrderedProductsModel.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        orderId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        product: {
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
        tableName: 'ordered_products',
    }
)
//иначе не цепляет внешний ключ если в index.ts только
// OrderedProductsModel.belongsTo(OrderModel, {
//     // foreignKey: 'order'
// })
