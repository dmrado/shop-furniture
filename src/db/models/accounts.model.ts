import {sequelize} from '../connection'
import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'
import {AuthUserModel} from "@/db/models/users.model";
export class AccountModel extends Model<InferAttributes<AccountModel>, InferCreationAttributes<AccountModel>> {

    declare id: CreationOptional<string>;
    declare type: string;
    declare provider: string;
    declare providerAccountId: string;
    declare refresh_token: string | null;
    declare access_token: string | null;
    declare expires_at: number | null;
    declare token_type: string | null;
    declare scope: string | null;
    declare id_token: string | null;
    declare session_state: string | null;
    declare userId: string;
    declare AuthUserId: string;
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
        providerAccountId: {type: DataTypes.STRING, allowNull: false},
        refresh_token: {type: DataTypes.STRING},
        access_token: {type: DataTypes.STRING},
        expires_at: {type: DataTypes.INTEGER},
        token_type: {type: DataTypes.STRING},
        scope: {type: DataTypes.STRING},
        id_token: {type: DataTypes.TEXT},
        session_state: {type: DataTypes.STRING},
        userId: {type: DataTypes.UUID,
            field: 'userId',
            references: {
                model: 'auth_users',
                key: 'id'
            }},
        AuthUserId: { type: DataTypes.UUID}
    },

    {
        sequelize,
        tableName: 'auth_accounts',
    }
);

// userId в таблице accounts служит внешним ключом (foreign key), который связывает запись аккаунта с конкретным пользователем в таблице auth_users.
