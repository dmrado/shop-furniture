import AddressModel from './address'
import ColorModel from './color'
import ItemModel from './item'
import OrderedItemModel from './orderedItem'

// Установка связей
ItemModel.belongsTo(ColorModel, { as: 'primaryColor', foreignKey: 'primary_color' })
ItemModel.belongsTo(ColorModel, { as: 'secondaryColor', foreignKey: 'secondary_color' })

OrderedItemModel.belongsTo(ItemModel, { foreignKey: 'item' })

export {
    AddressModel,
    ColorModel,
    ItemModel,
    OrderedItemModel,
};
