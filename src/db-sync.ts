import {Admin} from '@/db/modeladmin/admin.model'
import { Post } from '@/db/modeladmin/post.model'
import { sequelize } from '@/db/connection'
import { Alert } from '@/db/modeladmin/alert.model.ts'
import {AddressModel} from "./db/models/address.model"
import {ColorModel} from "./db/models/color.model";
import {ProductModel} from "./db/models/product.model";
import {OrderedProductsModel} from "./db/models/orderedProductsModel";
import {OrderModel} from "./db/models/order.model";
import {StockModel} from "./db/models/stock.model";
import {UserModel} from "./db/models/user.model";
import {CartModel} from "@/db/models/cart.model";

const registeredModels = [Admin, Post, Alert, AddressModel, ColorModel, ProductModel, OrderedProductsModel, OrderModel, StockModel, UserModel, CartModel ]
const runDbSync = async () => {
    console.log('Syncing DB schema for: ', registeredModels.map(m => m.name).join(', '))
    await sequelize.sync({ alter: true,  })
    console.log('...done syncing DB schema')
}
runDbSync()
