import {sequelize} from '../connection'
import { DataTypes, Model } from 'sequelize'
import { Address } from '../types/models'

class AddressModel extends Model<Address> implements Address {
    public id!: number;
    public userid!: number;
    public phone!: string;
    public city!: string;
    public street!: string;
    public home!: number;
    public corps!: number;
    public appart!: number;
    public ismain!: boolean;
}

AddressModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        corps: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        appart: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        ismain: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'adress',
    }
);

export default AddressModel