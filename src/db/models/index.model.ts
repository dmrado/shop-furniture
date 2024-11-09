import {AddressModel} from './address.model'
import {ColorModel} from './color.model'
import {ItemModel} from './item.model'
import {OrderedItemModel} from './orderedItem.model'
import {OrderModel} from './order.model'
import {StockModel} from './stock.model'
import {UserModel} from './user.model'

// Установка связей
ItemModel.belongsTo(ColorModel, { as: 'primaryColor', foreignKey: 'primary_color' })
ItemModel.belongsTo(ColorModel, { as: 'secondaryColor', foreignKey: 'secondary_color' })

OrderedItemModel.belongsTo(ItemModel, { foreignKey: 'item' })
OrderedItemModel.belongsTo(OrderModel, { foreignKey: 'order' })

StockModel.belongsTo(ItemModel, { foreignKey: 'itemid' })



AddressModel.belongsTo(UserModel, {
    // targetKey: 'id',
    // foreignKey: 'userId',
})
UserModel.hasMany(AddressModel, {
    // sourceKey: 'id',
    foreignKey: 'userId',
    as: 'addresses', // Алиас для связи
})


ItemModel.belongsTo(StockModel, {
    // targetKey: 'id',
    // foreignKey: 'userId',
})
StockModel.hasMany(ItemModel, {
    // sourceKey: 'id',
    foreignKey: 'id',
    as: 'items', // Алиас для связи
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
