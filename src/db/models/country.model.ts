import { sequelize } from '../connection'
import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize'

export interface CountryDTO extends InferAttributes<CountryModel> {}

// todo добавить для моделей брендов, коллекций, стран и стилей поле status со значением: active, moderate, deleted и преписать соотв функции здесь вообще отсутствует

export class CountryModel extends Model<
    InferAttributes<CountryModel>,
    InferCreationAttributes<CountryModel>
> {
    declare id: CreationOptional<number>
    declare name: string
    declare description: string
    declare isActive: boolean
}

CountryModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: 'countries'
    }
)
