import {sequelize} from '../connection'
import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import { Cart } from '../types/interfaces'
import {ProductModel} from "@/db/models"
import {UserModel} from "@/db/models"

export class CartModel extends Model<InferAttributes<CartModel>, InferCreationAttributes<CartModel>> implements Cart {
    declare id: number;
    declare productId: number;
    declare quantity: number;
    declare userId: number;
    declare discount: number;
    declare product: ProductModel;
    declare user: UserModel;
    declare createdAt: any;
    declare updatedAt: any;
}

CartModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1
        },
    },
    {
        sequelize,
        tableName: 'carts',
    }
)
// CartModel.belongsTo(ProductModel, {
//     foreignKey: 'productId',
//     as: 'product'
// })
