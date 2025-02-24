import { sequelize } from '@/db/connection'
// import { models } from '@auth/sequelize-adapter'
// import { DataTypes, Model } from 'sequelize'

export {}
// import { sequelize } from '../connection'
import {
    CreationOptional,
    DataTypes,
    // HasManyCreateAssociationMixin,
    // HasManyGetAssociationsMixin,
    // HasOneGetAssociationMixin,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize'
// import { CartModel } from '@/db/models'
// import { AddressModel } from '@/db/models'
// import { SessionModel } from '@/db/models'
// import { AccountModel } from '@/db/models'
// import { OuruserModel } from '@/db/models'

export class AuthUser extends Model<InferAttributes<AuthUser>, InferCreationAttributes<AuthUser>> {

    declare id: CreationOptional<string> // Изменено с number на string
    declare name?: string | null
    declare email: string
    declare emailVerified: Date | null // Изменен тип на Date
    declare image?: string | null
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    // declare ourUser?: OuruserModel // Добавляем связь с OuruserModel

    // Определение типов для связей
    // declare addresses?: InferAttributes<AddressModel>[]
    // declare getSessions: HasManyGetAssociationsMixin<SessionModel>;
    // declare getAccounts: HasManyGetAssociationsMixin<AccountModel>;
    // declare getOuruser: HasOneGetAssociationMixin<OuruserModel>;
    // declare createAddress: HasManyCreateAssociationMixin<AddressModel>;

}
// todo либо отойти от типа из SequelizeAdapter, либо сделать автоинкрементным связанное поле id из 'ourUser', а не email что тоже не факт что пройдет. Проблема что гугл провайдер присылает не число а  type: DataTypes.UUID, или строку, которую нельзя автоинкрементить.

AuthUser.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, unique: 'email' },
        emailVerified: { type: DataTypes.DATE },
        image: { type: DataTypes.STRING },
        createdAt: { type: DataTypes.DATE },
        updatedAt: { type: DataTypes.DATE },
    },
    {
        sequelize,
        tableName: 'auth_users',
    }
)

// export const AuthUser = sequelize.define<Model<typeof models.User>>('AuthUser', { ...models.User }, { tableName: 'auth_user' })