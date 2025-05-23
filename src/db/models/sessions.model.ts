import { sequelize } from '../connection'
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { AuthUserModel } from '@/db/models/users.model'
export class SessionModel extends Model<InferAttributes<SessionModel>, InferCreationAttributes<SessionModel>> {

    declare id?: string
    declare expires: Date
    declare sessionToken: string
    declare userId: string | null
    declare user?: AuthUserModel
}

SessionModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        expires: { type: DataTypes.DATE, allowNull: false },
        sessionToken: {
            type: DataTypes.STRING,
            unique: 'session_token',
            allowNull: false,
        },
        userId: { type: DataTypes.UUID },
    },
    {
        sequelize,
        tableName: 'auth_sessions',
    }
)
