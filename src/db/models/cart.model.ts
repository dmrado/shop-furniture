import { sequelize } from '../connection'
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { ProductModel } from '@/db/models'
import { UserModel } from '@/db/models'

export class CartModel extends Model<InferAttributes<CartModel>, InferCreationAttributes<CartModel>> {
    declare id: CreationOptional<number>
    declare productId: number
    declare quantity: number
    declare userId: number
    declare discount: CreationOptional<number | null>
    declare product?: InferAttributes<ProductModel>
    declare user?: UserModel
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
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
                model: 'ourusers',
                key: 'id'
            }
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'carts',
        timestamps: true
    }
)
