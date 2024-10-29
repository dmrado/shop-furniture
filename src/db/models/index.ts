import AddressModel from './address'
import ColorModel from './color'
import ItemModel from './item'
import OrderedItemModel from './orderedItem'
import OrderModel from './order'
import StockModel from './stock'
import UserModel from './user'

// Установка связей
ItemModel.belongsTo(ColorModel, { as: 'primaryColor', foreignKey: 'primary_color' })
ItemModel.belongsTo(ColorModel, { as: 'secondaryColor', foreignKey: 'secondary_color' })

OrderedItemModel.belongsTo(ItemModel, { foreignKey: 'item' })
OrderedItemModel.belongsTo(OrderModel, { foreignKey: 'order' })

OrderModel.belongsTo(UserModel, { foreignKey: 'userid' })
OrderModel.belongsTo(AddressModel, { foreignKey: 'adres' })
StockModel.belongsTo(ItemModel, { foreignKey: 'itemid' })

AddressModel.belongsTo(UserModel, { foreignKey: 'userid' })

export {
    AddressModel,
    ColorModel,
    ItemModel,
    OrderedItemModel,
    OrderModel,
    StockModel,
    UserModel,
};
