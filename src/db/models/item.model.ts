import {sequelize} from '../connection'
import { DataTypes, Model } from 'sequelize'
import { Item } from '../types/interfaces'

export class ItemModel extends Model<Item> implements Item {
    public id!: number;
    public isactive!: boolean;
    public articul!: string;
    public sku!: string;
    public name!: string;
    public description_1!: string;
    public description_2!: string;
    public length!: number;
    public width!: number;
    public height!: number;
    public weight!: number;
    public box_lenght!: number;
    public box_height!: number;
    public box_weight!: number;
    public pictures!: string;
    public old_price!: number;
    public new_price!: number;
    public primary_color!: number;
    public secondary_color!: number;
    public instock!: boolean;
}

ItemModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        isactive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        articul: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        sku: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        description_1: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        description_2: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        length: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        width: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        height: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        weight: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        box_lenght: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        box_height: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        box_weight: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        pictures: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        old_price: {
            type: DataTypes.DOUBLE(10, 2),
            allowNull: false,
        },
        new_price: {
            type: DataTypes.DOUBLE(10, 2),
            allowNull: false,
        },
        primary_color: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        secondary_color: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        instock: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'items',
    }
)
