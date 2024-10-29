import {sequelize} from '../connection'
import { DataTypes, Model } from 'sequelize'
import { User } from '../types/models'

class UserModel extends Model<User> implements User {
    public id!: number;
    public email!: string;
    public uname!: string;
    public usurname!: string;
    public ufathername!: string;
    public cancontact!: boolean;
    public isactive!: boolean;
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
        },
        uname: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        usurname: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        ufathername: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        cancontact: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        isactive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'user',
    }
);

export default UserModel