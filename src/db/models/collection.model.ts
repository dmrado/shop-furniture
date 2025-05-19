import { sequelize } from '../connection'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'

export interface CollectionDTO extends InferAttributes<CollectionModel> {}

export class CollectionModel extends Model<InferAttributes<CollectionModel>, InferCreationAttributes<CollectionModel>> {
    declare id: CreationOptional<number>
    declare name: string
    declare description: string
    declare isActive: boolean
}

CollectionModel.init(
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
        tableName: 'collections',
    }
)