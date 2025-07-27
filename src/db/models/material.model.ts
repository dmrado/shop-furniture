import { sequelize } from '../connection'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'

export interface MaterialDTO extends InferAttributes<MaterialModel> {}

export class MaterialModel extends Model<InferAttributes<MaterialModel>, InferCreationAttributes<MaterialModel>> {
    declare id: CreationOptional<number>
    declare code: string
    declare name: string
    declare isActive: boolean
}

MaterialModel.init(
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
        code: {
            type: DataTypes.STRING(128),
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
        tableName: 'materials',
    }
)