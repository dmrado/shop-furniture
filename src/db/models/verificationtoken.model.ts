import { sequelize } from '../connection'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'

export class VerificationTokenModel extends Model<InferAttributes<VerificationTokenModel>, InferCreationAttributes<VerificationTokenModel>> {
    declare token: CreationOptional<string>
    declare identifier: string
    declare expires: string
}

VerificationTokenModel.init(
    {
        token: { type: DataTypes.STRING, primaryKey: true },
        identifier: { type: DataTypes.STRING, allowNull: false },
        expires: { type: DataTypes.DATE, allowNull: false },
    },
    {
        sequelize,
        tableName: 'auth_verification_tokens',
    }
)