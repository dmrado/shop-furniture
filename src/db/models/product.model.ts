import { sequelize } from '../connection'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import {StockModel} from '@/db/models'


export interface Product extends InferAttributes<ProductModel> {}

export class ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>> {
    declare id: CreationOptional<number>

    declare articul: string
    declare sku: string
    declare name: string
    declare descriptionShort: string
    declare descriptionLong: string

    declare isNew: boolean
    declare isActive: boolean // управляет отображением на сайте (в каталоге)
    stock?: StockModel
}

ProductModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        descriptionShort: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        descriptionLong: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    },
    {
        sequelize,
        tableName: 'products',
    }
)
