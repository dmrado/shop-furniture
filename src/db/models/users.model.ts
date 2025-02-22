import {sequelize} from '../connection'
import {
    CreationOptional,
    DataTypes, HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin, HasOneGetAssociationMixin,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize'
import { CartModel } from '@/db/models'
import { AddressModel } from '@/db/models'
import { SessionModel } from '@/db/models'
import { AccountModel } from '@/db/models'
import { OuruserModel } from '@/db/models'

export class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    declare id: CreationOptional<string>; // Изменено с number на string
    declare name: string | null;
    declare email: string | null;
    declare email_verified: Date | null;  // Изменен тип на Date
    declare image: string | null;         // Добавлено null
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare ourUser?: OuruserModel; // Добавляем связь с OuruserModel

    // Определение типов для связей
    declare addresses?: InferAttributes<AddressModel>[]
    declare getSessions: HasManyGetAssociationsMixin<SessionModel>;
    declare getAccounts: HasManyGetAssociationsMixin<AccountModel>;
    declare getOuruser: HasOneGetAssociationMixin<OuruserModel>;
    declare createAddress: HasManyCreateAssociationMixin<AddressModel>;

    // todo 2. Привязывать корзину к не нашему юзеру, а к некст юзеру
    // 3. иметь 3 таблицы: адрес, персональные данные, телефон, которые привязывать к таблице некст юзера


    static associate() {
        CartModel.belongsTo(UserModel, {
            foreignKey: 'userId',
            as: 'user'
        });

        AddressModel.belongsTo(UserModel);
        UserModel.hasMany(AddressModel, {
            foreignKey: 'userId',
            as: 'addresses'
        });

        SessionModel.belongsTo(UserModel, {
            foreignKey: 'user_id',
            as: 'user'
        });
        // UserModel.hasMany(SessionModel, {
        //     foreignKey: 'user_id',
        //     as: 'sessions'
        // });

        AccountModel.belongsTo(UserModel, {
            foreignKey: 'user_id',
            as: 'user'
        });
        UserModel.hasMany(AccountModel, {
            foreignKey: 'user_id',
            as: 'accounts'
        });
    }
}
// todo либо отойти от типа из SequelizeAdapter, либо сделать автоинкрементным связанное поле id из 'ourUser', а не email что тоже не факт что пройдет. Проблема что гугл провайдер присылает не число а  type: DataTypes.UUID, или строку, которую нельзя автоинкрементить.

UserModel.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            // autoIncrement: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: true,
            unique: true, // Добавляем уникальный индекс
        },
        email_verified: {
            type: DataTypes.DATE, // Изменено на DATE
            allowNull: true
        },
        image: {
            type: DataTypes.STRING(128),
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        tableName: 'users',
    }
);
