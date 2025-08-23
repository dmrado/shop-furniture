import { sequelize } from '../connection'
import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes
} from 'sequelize'
import { ProductModel } from './product.model'
import { CategoryModel } from './category.model'

export interface ProductCategoryDTO
    extends InferAttributes<ProductCategoryModel> {}

export class ProductCategoryModel extends Model<
    InferAttributes<ProductCategoryModel>,
    InferCreationAttributes<ProductCategoryModel>
> {
    declare productId: number
    declare categoryId: number
}

ProductCategoryModel.init(
    {
        productId: {
            type: DataTypes.INTEGER,
            references: {
                model: ProductModel, // Явно указываем на модель ProductModel
                key: 'id'
            },
            primaryKey: true, // Составной первичный ключ
            onUpdate: 'RESTRICT',
            onDelete: 'CASCADE'
        },
        categoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: CategoryModel, // Явно указываем на модель CategoryModel
                key: 'id'
            },
            primaryKey: true, // Составной первичный ключ
            onUpdate: 'RESTRICT',
            onDelete: 'CASCADE'
        }
    },
    {
        sequelize,
        tableName: 'product_categories',
        timestamps: false
    }
)
