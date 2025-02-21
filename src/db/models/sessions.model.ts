import {sequelize} from '../connection'
import {DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional} from 'sequelize'
import {UserModel} from "@/db/models/users.model";
export class SessionModel extends Model<InferAttributes<SessionModel>, InferCreationAttributes<SessionModel>> {
    declare id?: string
    declare expires: Date;
    declare session_token: string;
    declare user_id: string | null;
    declare user?: UserModel
}

SessionModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        expires: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        session_token: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID, // Если id в таблице users тоже UUID
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        tableName: 'sessions',
    }
);
