// export {}
import { sequelize } from '../connection'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import {AuthUser} from "@/db/models/users.model";

export class OuruserModel extends Model<InferAttributes<OuruserModel>, InferCreationAttributes<OuruserModel>> {
    //todo проверить нужен ли знак  ?
    declare id?: CreationOptional<number>
    declare userId: string
    declare email: string
    declare name: string
    declare surName: string
    declare fatherName: string
    declare canContact: boolean
    declare isActive: boolean
    declare isAgreed: boolean
    declare agreementDate: Date
    declare user?: AuthUser   // Добавляем связь с UserModel
}

OuruserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID, // Если id в таблице users тоже UUID
            allowNull: false,
            references: {
                model: 'auth_users',
                key: 'id'
            }
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
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
    },
    {
        sequelize,
        tableName: 'ourusers',
    }
)
