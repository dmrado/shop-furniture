import {sequelize} from '../connection'
import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import { Cart } from '../types/interfaces'
import {ProductModel} from "@/db/models/product.model"
import {UserModel} from "@/db/models/user.model"

export class CartModel extends Model<InferAttributes<CartModel>, InferCreationAttributes<CartModel>> implements Cart {
    declare id: number;
    declare productId: number;
    declare quantity: number;
    declare userId: number;
    declare datetime: Date;
    products?: ProductModel;
    user?: UserModel;
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
        datetime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        tableName: 'carts',
    }
)