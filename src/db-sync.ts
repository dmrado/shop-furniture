// import {Admin} from '@/db/modeladmin/admin.model'
// import { Post } from '@/db/modeladmin/post.model'
// import { Alert } from '@/db/modeladmin/alert.model.ts'
import { sequelize } from '@/db/connection'
import {
    AddressModel,
    CartModel,
    ColorModel,
    OrderModel,
    OrderedProductsModel,
    ProfileModel,
    ProductModel,
    StockModel,
    AuthUserModel,
} from '@/db/models'
import {CategoryModel} from '@/db/models/category.model'
import {ProductVariantModel} from "@/db/models/productVariant.model";
import {ProductCategoryModel} from "@/db/models/productCategory.model";

//todo взять из index.model.ts и так же во всех местах где они используются https://stackoverflow.com/questions/73319033/sequelize-model-is-not-associated-to-post

const registeredModels = [
    // Admin, Post, Alert,
    AddressModel,
    ColorModel,
    ProductModel,
    OrderedProductsModel,
    OrderModel,
    StockModel,
    CartModel,
    AuthUserModel,
    ProfileModel,
    CategoryModel,
    ProductVariantModel,
    ProductCategoryModel,
]
const runDbSync = async () => {
    console.log('Syncing DB schema for: ', registeredModels.map(m => m.name).join(', '))
    await sequelize.sync({ alter: true, })
    console.log('...done syncing DB schema')
}
runDbSync()
