import { sequelize } from '../connection'
import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize'
import { AuthUserModel } from '@/db/models/users.model'
import {
    ProductVariantDTO,
    ProductVariantModel
} from '@/db/models/product_variant.model'
export interface CartModelDTO extends InferAttributes<CartModel> {}

export class CartModel extends Model<
    InferAttributes<CartModel>,
    InferCreationAttributes<CartModel>
> {
    declare id: CreationOptional<number>
    declare quantity: number
    declare userId: string
    declare discount: CreationOptional<number | null>
    declare product_variants?: ProductVariantModel
    declare user?: AuthUserModel
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

CartModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productVariant: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'product_variants',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        userId: {
            type: DataTypes.UUID, // Если id в таблице users тоже UUID
            allowNull: false,
            references: {
                model: 'auth_users',
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
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'carts',
        timestamps: true
    }
)
