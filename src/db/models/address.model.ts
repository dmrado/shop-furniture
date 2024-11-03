import {sequelize} from '../connection'
import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'
import { Address } from '../types/interfaces'
import {UserModel} from "@/db/models/user.model";

export class AddressModel extends Model<InferAttributes<AddressModel>, InferCreationAttributes<AddressModel>> implements Address {
    declare id: number;
    declare userId: number;
    declare phone: string;
    declare city: string;
    declare street: string;
    declare home: string;
    declare corps: string;
    declare appart: string;
    declare isMain: boolean;
}

AddressModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
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
