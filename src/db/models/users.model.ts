import { sequelize } from '@/db/connection'
// import { models } from '@auth/sequelize-adapter'
// import { DataTypes, Model } from 'sequelize'
// import { sequelize } from '../connection'
import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize'
import { ProfileModel } from '@/db/models/profile.model'

export interface AuthUser extends InferAttributes<AuthUserModel> {}

export class AuthUserModel extends Model<
    InferAttributes<AuthUserModel>,
    InferCreationAttributes<AuthUserModel>
> {
    declare id: CreationOptional<string> // Изменено с number на string
    declare name?: string | null
    declare email: string
    declare emailVerified: Date | null // Изменен тип на Date
    declare image?: string | null
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare ourUser?: ProfileModel // Добавляем связь с OuruserModel
}

AuthUserModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, unique: 'email' },
        emailVerified: { type: DataTypes.DATE },
        image: { type: DataTypes.STRING },
        createdAt: { type: DataTypes.DATE },
        updatedAt: { type: DataTypes.DATE }
    },
    {
        sequelize,
        tableName: 'auth_users'
    }
)

// export const AuthUser = sequelize.define<Model<typeof models.User>>('AuthUser', { ...models.User }, { tableName: 'auth_user' })
