import { sequelize } from '../connection'
import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize'
import { ProductModel } from './product.model'

export interface Tag extends InferAttributes<TagModel> {}

export class TagModel extends Model<
  InferAttributes<TagModel>,
  InferCreationAttributes<TagModel>
> {
    declare id?: CreationOptional<number>
    declare parentId: number | null
    declare name: string
    declare slug: string
    declare products?: ProductModel[] // Связь с ProductModel (many-to-many)
}

// Инициализация модели

TagModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'tags', // Ссылка на саму себя для организации иерархии
                key: 'id',
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: 'tags',
    }
)

//todo перенесено в index
// Настройка ассоциаций
export const setupTagAssociations = (models: any) => {
    const { TagModel, ProductModel } = models

    // Связь тега с родительским тегом (для организации иерархии)
    TagModel.belongsTo(TagModel, {
        foreignKey: 'parentId',
        as: 'parent',
    })

    TagModel.hasMany(TagModel, {
        foreignKey: 'parentId',
        as: 'children',
    })

    // Связь многие-ко-многим с продуктами
    TagModel.belongsToMany(ProductModel, {
        through: 'product_tags', // Промежуточная таблица
        foreignKey: 'tagId',
        otherKey: 'productId',
        as: 'products',
    })

    ProductModel.belongsToMany(TagModel, {
        through: 'product_tags', // Промежуточная таблица
        foreignKey: 'productId',
        otherKey: 'tagId',
        as: 'tags',
    })
}
