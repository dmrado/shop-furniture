import {AddressModel} from './address.model'
import {ColorModel} from './color.model'
import {ProductModel} from './product.model'
import {OrderedItemModel} from './orderedItem.model'
import {OrderModel} from './order.model'
import {StockModel} from './stock.model'
import {UserModel} from './user.model'

// Установка связей
ProductModel.belongsTo(ColorModel, { as: 'primaryColor', foreignKey: 'primary_color' })
ProductModel.belongsTo(ColorModel, { as: 'secondaryColor', foreignKey: 'secondary_color' })

OrderedItemModel.belongsTo(ProductModel, { foreignKey: 'item' })
OrderedItemModel.belongsTo(OrderModel, { foreignKey: 'order' })

StockModel.belongsTo(ProductModel, { foreignKey: 'itemid' })



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

export {
    // AddressModel,
    // ColorModel,
    // ItemModel,
    // OrderedItemModel,
    // OrderModel,
    // StockModel,
    // UserModel,
};
