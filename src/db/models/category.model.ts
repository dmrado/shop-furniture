// export {}
import { sequelize } from "../connection";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { ProductModel } from "@/db/models/product.model";

export interface Category extends InferAttributes<CategoryModel> {}

export class CategoryModel extends Model<
  InferAttributes<CategoryModel>,
  InferCreationAttributes<CategoryModel>
> {
  declare id?: CreationOptional<number>;
  declare parentId: number | null;
  declare name: string;
  declare slug: string;
  declare image: string;
  declare product?: ProductModel // Добавляем связь с ProductModel
}

CategoryModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "categories",
  }
);
