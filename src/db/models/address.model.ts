import { sequelize } from '../connection'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import {AuthUserModel} from "@/db/models/users.model";

export interface Address extends InferAttributes<AddressModel> {}
export class AddressModel extends Model<InferAttributes<AddressModel>, InferCreationAttributes<AddressModel>> {
    declare id: CreationOptional<number>
    declare userId: string
    declare phone: string
    declare city: string
    declare street: string
    declare home: string
    declare corps: string
    declare appart: string
    declare isMain: boolean
}

AddressModel.init(
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
        phone: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        street: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        home: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        corps: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        appart: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        isMain: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'address',
    }
)
