import {Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes} from 'sequelize'
import {sequelize} from '../connection'

export class Admin extends Model<InferAttributes<Admin>, InferCreationAttributes<Admin>> {
    declare id: CreationOptional<number>
    //todo: add unique index, probably using decorators
    declare name: string
    declare surname: string
}

Admin.init({
        id: {

            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING
        },
        surname: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'admins',
    })
