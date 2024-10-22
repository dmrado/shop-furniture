import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from 'sequelize'
import { User } from './user.model'
import { sequelize } from './connection'

export class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
    declare id: CreationOptional<number>
    declare title: string
    declare text: string
    declare preview: string
    declare path?: string
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        // unique: true,
        type: DataTypes.STRING
    },
    text: {
        // defaultValue: 'ЭТОТ ПОСТ НЕ ИМЕЛ ТЕКСТА ПРИ СОЗДАНИИ',
        type: DataTypes.TEXT,
        defaultValue: '-- default --'
    },
    preview: {
        //для сохранения текста поста без HTML-разметки для PostsPrewiev
        type: DataTypes.STRING
    },
    path: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
},
{
    sequelize,
    tableName: 'posts',
    timestamps: true
})
Post.belongsTo(User)

export type PostPreview = Pick< Post, 'id' | 'title' | 'preview' | 'path' | 'createdAt' >
