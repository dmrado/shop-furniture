import {AddressModel} from '@/db/models/address.model'
import {ColorModel} from '@/db/models/color.model'
import {ProductModel} from '@/db/models/product.model'
import {OrderedProductsModel} from '@/db/models/orderedProducts.model'
import {OrderModel} from '@/db/models/order.model'
import {StockModel} from '@/db/models/stock.model'
import {OuruserModel} from '@/db/models/ouruser.model'
import {CartModel} from '@/db/models/cart.model'
import {SessionModel} from "@/db/models/sessions.model";
import {AccountModel} from "@/db/models/accounts.model";
import {UserModel} from "@/db/models/users.model";

// Установка связей
ProductModel.belongsTo(ColorModel, { as: 'primaryColor', foreignKey: 'primary_color' })
ProductModel.belongsTo(ColorModel, { as: 'secondaryColor', foreignKey: 'secondary_color' })


OrderModel.hasMany(OrderedProductsModel, {
    foreignKey: 'orderId',
    as: 'products'
})
OrderedProductsModel.belongsTo(OrderModel, {
    // foreignKey: 'order'
})


//todo need fix
StockModel.belongsTo(ProductModel, {
    // sourceKey: 'id',
    // foreignKey: 'id',
})

ProductModel.hasOne(StockModel, {
    // targetKey: 'id',
    foreignKey: 'productId',
    as: 'stock', // Алиас для связи
})


CartModel.belongsTo(ProductModel, {
    foreignKey: 'productId',
    as: 'product'
})
CartModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user'
})
// Связи для Users
AddressModel.belongsTo(UserModel, {
    // targetKey: 'id',
    // foreignKey: 'userId',
})
UserModel.hasMany(AddressModel, {
    // sourceKey: 'id',
    foreignKey: 'userId',
    as: 'addresses', // Алиас для связи
})
// Связи для Sessions
SessionModel.belongsTo(UserModel, {
    foreignKey: 'user_id',
    as: 'user'
})
UserModel.hasMany(SessionModel, {
    foreignKey: 'user_id',
    as: 'sessions'
})

// Связи для Accounts
AccountModel.belongsTo(UserModel, {
    foreignKey: 'user_id',
    as: 'user'
})
UserModel.hasMany(AccountModel, {
    foreignKey: 'user_id',
    as: 'accounts'
})

// Связи между user и ouruser
OuruserModel.belongsTo(UserModel, {
    foreignKey: 'email',
    targetKey: 'email', // указываем, что связь идет по полю email
    as: 'user'
})
UserModel.hasOne(OuruserModel, {
    foreignKey: 'email',
    sourceKey: 'email', // указываем, что связь идет по полю email
    as: 'ourUser' // Алиас для связи
})

//файл подключен в root layout
export {
    CartModel,
    ProductModel,
    AddressModel,
    ColorModel,
    OrderedProductsModel,
    OrderModel,
    StockModel,
    OuruserModel,
    AccountModel,
    SessionModel
}
