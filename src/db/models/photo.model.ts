import { sequelize } from '../connection'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { ProductVariantModel } from '@/db/models/product_variant.model'
import { ProductModel } from '@/db/models/product.model'

export interface PhotoDTO extends InferAttributes<PhotoModel> {}

export class PhotoModel extends Model<InferAttributes<PhotoModel>, InferCreationAttributes<PhotoModel>> {
    declare id: CreationOptional<number>
    declare productId: number
    declare productVariantId: number
    declare photoPath: string
}

PhotoModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: true, // или true, если продукт может не иметь фото
            references: {
                model: ProductModel,
                key: 'id'
            }
        },
        productVariantId: {
            type: DataTypes.INTEGER,
            allowNull: true, // или true, если продукт может не иметь категории
            references: {
                model: ProductVariantModel,
                key: 'id'
            }
        },
        photoPath: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'photos',
    }
)