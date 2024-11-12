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
    declare discount: number;
    declare datetime: Date;
    declare products?: ProductModel;
    declare user?: UserModel;
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