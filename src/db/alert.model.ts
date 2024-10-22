import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from 'sequelize'
import { sequelize } from './connection'

export class Alert extends Model<InferAttributes<Alert>, InferCreationAttributes<Alert>> {
    declare id: CreationOptional<number>
    declare title: string
    declare text: string
    declare startDate: Date
    declare endDate: Date
}

Alert.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING
    },
    text: {
        type: DataTypes.TEXT,
        defaultValue: '-- default --'
    },
    startDate: {
        type: DataTypes.DATE
    },
    endDate: {
        type: DataTypes.DATE
    },
},
{
    sequelize,
    tableName: 'alerts',
    timestamps: false
})