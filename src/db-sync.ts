// import {Admin} from '@/db/modeladmin/admin.model'
// import { Post } from '@/db/modeladmin/post.model'
import { sequelize } from '@/db/connection'
// import { Alert } from '@/db/modeladmin/alert.model.ts'
import {AddressModel} from "@/db/models"
import {ColorModel} from "@/db/models";
import {ProductModel} from "@/db/models";
import {OrderedProductsModel} from "@/db/models";
import {OrderModel} from "@/db/models";
import {StockModel} from "@/db/models";
import {UserModel} from "@/db/models";
import {CartModel} from "@/db/models";
//todo взять из index.mpdel.ts и так же во всех местах где они используются https://stackoverflow.com/questions/73319033/sequelize-model-is-not-associated-to-post
const registeredModels = [
    // Admin, Post, Alert,
    AddressModel, ColorModel, ProductModel, OrderedProductsModel, OrderModel, StockModel, UserModel, CartModel ]
const runDbSync = async () => {
    console.log('Syncing DB schema for: ', registeredModels.map(m => m.name).join(', '))
    await sequelize.sync({ alter: true,  })
    console.log('...done syncing DB schema')
}
runDbSync()
