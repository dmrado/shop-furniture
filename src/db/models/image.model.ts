import { sequelize } from '../connection.ts'
import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize'
import { ProductModel } from '@/db/models/product.model.ts' // Импортируем модель Product
import { ProductVariantModel } from '@/db/models/product_variant.model.ts' // Импортируем модель ProductVariant

export interface ImageDTO extends InferAttributes<ImageModel> {}

export class ImageModel extends Model<
    InferAttributes<ImageModel>,
    InferCreationAttributes<ImageModel>
> {
    declare id: CreationOptional<number>
    declare path: string

    declare productId: CreationOptional<number | null> // Вторичный ключ для Product (может быть пустым)
    declare productVariantId: CreationOptional<number | null> // Вторичный ключ для ProductVariant (может быть пустым)
}

ImageModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        path: {
            type: DataTypes.STRING(255), // Длина строки для пути
            allowNull: false // Путь должен быть всегда
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: ProductModel,
                key: 'id'
            },
            onDelete: 'SET NULL', // При удалении продукта, productId в изображении станет NULL
            onUpdate: 'CASCADE' // При обновлении ID продукта, обновится и здесь
        },
        productVariantId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: ProductVariantModel,
                key: 'id'
            },
            onDelete: 'SET NULL', // При удалении варианта, productVariantId в изображении станет NULL
            onUpdate: 'CASCADE' // При обновлении ID варианта, обновится и здесь
        }
    },
    {
        sequelize,
        tableName: 'images',
        timestamps: true
    }
)
