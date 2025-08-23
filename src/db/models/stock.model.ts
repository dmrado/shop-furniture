import { sequelize } from '../connection'
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize'

export class StockModel extends Model<
    InferAttributes<StockModel>,
    InferCreationAttributes<StockModel>
> {
    declare id: number
    declare productId: number
    declare quantity: number
    // Активирует возможность заказать товар. Нужен для управления "снятием с продажи", даже если товар есть на складе.
    // Товар отображается в каталоге, даже если false
    declare inStock: boolean
    declare lastUpdate: Date
}

StockModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // todo: clarify why this is needed, when we have quantity already
        inStock: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        lastUpdate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        tableName: 'stocks'
    }
)
