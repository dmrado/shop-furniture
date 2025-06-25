import { sequelize } from '../connection'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { ProductModel } from '@/db/models/product.model'
import { ColorModel } from '@/db/models/color.model'
import {CartModel} from "@/db/models/cart.model";

export interface ProductVariantDTO extends InferAttributes<ProductVariantModel> {}

export class ProductVariantModel extends Model<InferAttributes<ProductVariantModel>, InferCreationAttributes<ProductVariantModel>> {
    declare id: CreationOptional<number>
    declare isActive: boolean // управляет отображением на сайте (в каталоге)
    declare articul: string

    declare productId: number
    // declare materialId: number
    declare colorId: number
    // declare cartId: CreationOptional<number | null> // может быть null если не в корзине

    declare length: number
    declare width: number
    declare height: number
    declare box_length: number
    declare box_height: number
    declare box_weight: number
    declare weight: number

    declare price: number
}

ProductVariantModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // cartId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true, // товар может не быть в корзине
        //     references: {
        //         model: CartModel,
        //         key: 'id'
        //     }
        // },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ProductModel,
                key: 'id'
            }
        },
        // materialId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false, // или true, если продукт может не иметь категории
        //     references: {
        //         model: MaterialModel,
        //         key: 'id'
        //     }
        // },
        colorId: {
            type: DataTypes.INTEGER,
            allowNull: false, // или true, если продукт может не иметь категории
            references: {
                model: ColorModel,
                key: 'id'
            }
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        articul: {
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
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'product_variants',
    }
)
