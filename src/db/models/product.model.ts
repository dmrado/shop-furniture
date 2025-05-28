import {sequelize} from '../connection'
import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'
import {StyleModel} from '@/db/models/style.model'
import {CollectionModel} from '@/db/models/collection.model'
import {BrandModel} from '@/db/models/brand.model'
import {CountryModel} from '@/db/models/country.model'
import {CategoryModel} from "@/db/models/category.model";
import {ProductVariantModel} from "@/db/models/product_variant.model";

export interface ProductDTO extends InferAttributes<ProductModel> {
}

export class ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>> {
    declare id: CreationOptional<number>

    declare categoryId: number
    declare styleId: number
    declare brandId: number
    declare collectionId: number
    declare countryId: number

    declare name: string
    declare articul: string
    declare sku: string
    declare descriptionShort: string
    declare descriptionLong: string

    declare isNew: boolean
    declare isActive: boolean // управляет отображением на сайте (в каталоге)


    // Определение ассоциации с ProductVariantModel
    declare ProductVariants?: ProductVariantModel[]; // Опционально для TypeScript
    static associate: (models: any) => void;
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
            allowNull: false,
            references: {
                model: CategoryModel,
                key: 'id',
                defaultValue: true
            }
        },
        styleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: StyleModel,
                key: 'id',
                defaultValue: true
            }
        },
        brandId: {
            type: DataTypes.INTEGER,
            allowNull: false, // или true, если продукт может не иметь бренда
            references: {
                model: BrandModel,
                key: 'id'
            }
        },
        collectionId: {
            type: DataTypes.INTEGER,
            allowNull: false, // или true, если продукт может не иметь признака коллекции
            references: {
                model: CollectionModel,
                key: 'id'
            }
        },
        countryId: {
            type: DataTypes.INTEGER,
            allowNull: false, // или true, если продукт может не иметь признака коллекции
            references: {
                model: CountryModel,
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        articul: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        sku: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        descriptionShort: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        descriptionLong: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isNew: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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