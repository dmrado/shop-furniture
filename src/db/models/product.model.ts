import { sequelize } from '../connection'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import {ProfileModel, StockModel} from '@/db/models'
import {CategoryModel} from "@/db/models/category.model";


export interface Product extends InferAttributes<ProductModel> {}

export class ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>> {
    declare id: CreationOptional<number>
    declare categoryId: number
    declare isActive: boolean // управляет отображением на сайте (в каталоге)
    declare isNew: boolean
    declare articul: string
    declare sku: string
    declare name: string
    declare description_1: string
    declare description_2: string
    declare length: number
    declare width: number
    declare height: number
    declare weight: number
    declare box_length: number
    declare box_height: number
    declare box_weight: number
    declare image: string
    declare old_price: number
    declare new_price: number
    declare primary_color: number
    declare secondary_color: number
    stock?: StockModel
}

ProductModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false, // или true, если продукт может не иметь категории
            references: {
                model: CategoryModel,
                key: 'id'
            }
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        isNew: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        articul: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        sku: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        description_1: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        description_2: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        length: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        width: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        box_length: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        box_height: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        box_weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        old_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        new_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        primary_color: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        secondary_color: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'products',
    }
)
