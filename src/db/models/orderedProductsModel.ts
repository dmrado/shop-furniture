import {sequelize} from '../connection'
import { DataTypes, Model, InferAttributes, InferCreationAttributes  } from 'sequelize'
import { OrderedProducts } from '../types/interfaces'
import {OrderModel} from "@/db/models/order.model";

export class OrderedProductsModel extends Model<InferAttributes<OrderedProductsModel>, InferCreationAttributes<OrderedProductsModel>>  implements OrderedProducts {
    declare id: number;
    declare order: number;
    declare product: number;
    declare quantity: number;
    declare status: number;
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
//иначе не цепляет внешний ключ если в index.model.ts только
OrderedProductsModel.belongsTo(OrderModel, {
    // foreignKey: 'order'
})
