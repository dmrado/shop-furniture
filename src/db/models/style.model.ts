import { sequelize } from '../connection'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
// import { ProductModel } from '@/db/models/product.model'

export interface StyleDTO extends InferAttributes<StyleModel> {}

export class StyleModel extends Model<InferAttributes<StyleModel>, InferCreationAttributes<StyleModel>> {
    declare id: CreationOptional<number>
    declare name: string
    declare description: string
    declare isActive: boolean
}

StyleModel.init(
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
        description: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: 'styles',
    }
)