import { sequelize } from '../connection'
import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import { AddressModel } from '@/db/models'

export class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    declare id: number
    declare email: string
    declare name: string
    declare surName: string
    declare fatherName: string
    declare canContact: boolean
    declare isActive: boolean
    declare addresses?: InferAttributes<AddressModel>[]
}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        surName: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        fatherName: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        canContact: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'users',
    }
)
