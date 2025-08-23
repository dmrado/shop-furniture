// export {}
import { sequelize } from '../connection'
import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize'
import { AuthUserModel } from '@/db/models/users.model'
import { AddressModel } from '@/db/models/address.model'

export interface Profile extends InferAttributes<ProfileModel> {}

export class ProfileModel extends Model<
    InferAttributes<ProfileModel>,
    InferCreationAttributes<ProfileModel>
> {
    //todo проверить нужен ли знак  ?
    declare id?: CreationOptional<number>
    declare userId: string
    declare name: string
    declare surName: string
    declare fatherName: string
    declare canContact: boolean
    declare isActive: boolean
    declare isAgreed: boolean
    declare agreementDate: Date
    declare user?: AuthUserModel // Добавляем связь с UserModel
}

ProfileModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID, // Если id в таблице users тоже UUID
            allowNull: false,
            references: {
                model: 'auth_users',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: true
        },
        surName: {
            type: DataTypes.STRING(128),
            allowNull: true
        },
        fatherName: {
            type: DataTypes.STRING(128),
            allowNull: true
        },
        canContact: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: true
        },
        isAgreed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        agreementDate: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'profiles'
    }
)
