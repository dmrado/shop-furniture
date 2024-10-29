import {Admin} from '@/db/modelsold/admin.model'
import { Post } from '@/db/modelsold/post.model'
import { sequelize } from '@/db/connection'
import { Alert } from '@/db/modelsold/alert.model.ts'
import AddressModel from "./db/models/address"
import ColorModel from "./db/models/color";
import ItemModel from "./db/models/item";
import OrderedItemModel from "./db/models/orderedItem";
import OrderModel from "./db/models/order";
import StockModel from "./db/models/stock";
import UserModel from "./db/models/user";

const registeredModels = [Admin, Post, Alert, AddressModel, ColorModel, ItemModel, OrderedItemModel, OrderModel, StockModel, UserModel ]
const runDbSync = async () => {
    console.log('Syncing DB schema for: ', registeredModels.map(m => m.name).join(', '))
    await sequelize.sync({ alter: true })
    console.log('...done syncing DB schema')
}
runDbSync()
