import {sequelize} from '../connection'
import {DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional} from 'sequelize'
import {AddressModel} from '@/db/models'

export class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    //todo проверить нуэен ли знак  ?
    declare id?: CreationOptional<number>
    declare email: string
    declare name: string
    declare surName: string
    declare fatherName: string
    declare canContact: boolean
    declare isActive: boolean
    declare isAgreed: boolean
    declare agreementDate: Date
    declare provider: string
    declare providerAccountId: string
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
            allowNull: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        surName: {
            type: DataTypes.STRING(128),
            allowNull: true,
        },
        fatherName: {
            type: DataTypes.STRING(128),
            allowNull: true,
        },
        canContact: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        isAgreed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        agreementDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        provider: {
            type: DataTypes.STRING,
            allowNull: true
        },
        providerAccountId: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'ourusers',
    }
)
