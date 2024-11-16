import {AddressModel} from '@/db/models/address.model'
import {ColorModel} from '@/db/models/color.model'
import {ProductModel} from '@/db/models/product.model'
import {OrderedProductsModel} from '@/db/models/orderedProductsModel'
import {OrderModel} from '@/db/models/order.model'
import {StockModel} from '@/db/models/stock.model'
import {UserModel} from '@/db/models/user.model'
import {CartModel} from '@/db/models/cart.model'

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


AddressModel.belongsTo(UserModel, {
    // targetKey: 'id',
    // foreignKey: 'userId',
})
UserModel.hasMany(AddressModel, {
    // sourceKey: 'id',
    foreignKey: 'userId',
    as: 'addresses', // Алиас для связи
})



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
    as: 'products'
})

CartModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user'
})

//файл подключен в root layout
export {
    // AddressModel,
    // ColorModel,
    // ItemModel,
    // OrderedItemModel,
    // OrderModel,
    // StockModel,
    // UserModel,
}
