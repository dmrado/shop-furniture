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
    // declare addresses?: InferAttributes<AddressModel>[]
    // declare getSessions: HasManyGetAssociationsMixin<SessionModel>;
    // declare getAccounts: HasManyGetAssociationsMixin<AccountModel>;
    // declare getOuruser: HasOneGetAssociationMixin<OuruserModel>;
    // declare createAddress: HasManyCreateAssociationMixin<AddressModel>;

}
// todo либо отойти от типа из SequelizeAdapter, либо сделать автоинкрементным связанное поле id из 'ourUser', а не email что тоже не факт что пройдет. Проблема что гугл провайдер присылает не число а  type: DataTypes.UUID, или строку, которую нельзя автоинкрементить.

UserModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, unique: "email" },
        email_verified: { type: DataTypes.DATE },
        image: { type: DataTypes.STRING },
    },
    {
        sequelize,
        tableName: 'users',
    }
);
