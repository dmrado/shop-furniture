// import {Admin} from '@/db/modeladmin/admin.model'
// import { Post } from '@/db/modeladmin/post.model'
// import { Alert } from '@/db/modeladmin/alert.model.ts'
import { sequelize } from '@/db/connection'
import {AccountModel, AddressModel, CartModel, ColorModel, OrderModel, OrderedProductsModel, OuruserModel, ProductModel, SessionModel, StockModel, } from "@/db/models"
import {UserModel} from "@/db/models/users.model";

//todo взять из index.mpdel.ts и так же во всех местах где они используются https://stackoverflow.com/questions/73319033/sequelize-model-is-not-associated-to-post
const registeredModels = [
    // Admin, Post, Alert,
    AddressModel, ColorModel, ProductModel, OrderedProductsModel, OrderModel, StockModel, OuruserModel, CartModel, SessionModel,  AccountModel, UserModel]
const runDbSync = async () => {
    console.log('Syncing DB schema for: ', registeredModels.map(m => m.name).join(', '))
    await sequelize.sync({ alter: true,  })
    console.log('...done syncing DB schema')
}
runDbSync()
