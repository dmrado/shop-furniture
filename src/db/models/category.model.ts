// export {}
import { sequelize } from '../connection'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import {ProductModel} from '@/db/models/product.model'


export interface Category extends InferAttributes<CategoryModel> {}

export class CategoryModel extends Model<InferAttributes<CategoryModel>, InferCreationAttributes<CategoryModel>> {
    declare id?: CreationOptional<number>
    declare name: string
    declare grandCategory: string
    // declare product?: ProductModel // Добавляем связь с UserModel
}

CategoryModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        grandCategory: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'categories',
    }
)
