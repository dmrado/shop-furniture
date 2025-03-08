import {sequelize} from '../connection'
import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'

export class AccountModel extends Model<InferAttributes<AccountModel>, InferCreationAttributes<AccountModel>> {

    declare id: CreationOptional<string>;
    declare type: string;
    declare provider: string;
    declare provider_account_id: string;
    declare refresh_token: string | null;
    declare access_token: string | null;
    declare expires_at: number | null;
    declare token_type: string | null;
    declare scope: string | null;
    declare id_token: string | null;
    declare session_state: string | null;
    declare user_id: string | null;
}

AccountModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        type: {type: DataTypes.STRING, allowNull: false},
        provider: {type: DataTypes.STRING, allowNull: false},
        provider_account_id: {type: DataTypes.STRING, allowNull: false},
        refresh_token: {type: DataTypes.STRING},
        access_token: {type: DataTypes.STRING},
        expires_at: {type: DataTypes.INTEGER},
        token_type: {type: DataTypes.STRING},
        scope: {type: DataTypes.STRING},
        id_token: {type: DataTypes.TEXT},
        session_state: {type: DataTypes.STRING},
        userId: {type: DataTypes.UUID},
    },
    {
        sequelize,
        tableName: 'auth_accounts',
    }
);
