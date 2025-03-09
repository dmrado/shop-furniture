import { AddressModel } from '@/db/models/address.model'
import { ColorModel } from '@/db/models/color.model'
import { ProductModel } from '@/db/models/product.model'
import { OrderedProductsModel } from '@/db/models/orderedProducts.model'
import { OrderModel } from '@/db/models/order.model'
import { StockModel } from '@/db/models/stock.model'
import { CartModel } from '@/db/models/cart.model'
import { SessionModel } from '@/db/models/sessions.model'
import { AccountModel } from '@/db/models/accounts.model'
import { AuthUserModel } from '@/db/models/users.model'
import {ProfileModel} from "@/db/models/profile.model";

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


CartModel.belongsTo(AuthUserModel, {
    foreignKey: 'userId',
    as: 'user'
})


AddressModel.belongsTo(AuthUserModel, {
    // targetKey: 'id',
    foreignKey: 'userId',
})
AuthUserModel.hasMany(AddressModel, {
    // sourceKey: 'id',
    foreignKey: 'userId',
    as: 'addresses', // Алиас для связи
})


AuthUserModel.hasOne(ProfileModel, {
    foreignKey: 'userId', // Это поле в таблице ourusers, в accounts требует sequelize adapter
    as: 'profiles', // Алиас для связи с OuruserModel
    sourceKey: 'id'
})
ProfileModel.belongsTo(AuthUserModel, {
    foreignKey: 'userId', // То же имя внешнего ключа в таблице ouruser
    as: 'profiles',       // Алиас для доступа к связанному пользователю в AuthUser
    targetKey: 'id'   // Поле в AuthUser, на которое ссылается внешний ключ
});


//так как при входе через разных провайдеров каждый раз создается запись и в AuthUser и в AccountModel, то выбрана связь один-к-одному
AuthUserModel.hasOne(AccountModel, {
    foreignKey: 'userId', // Это поле в таблице accounts
    as: 'accounts',
    sourceKey: 'id'
});
AccountModel.belongsTo(AuthUserModel, {
    foreignKey: 'userId', // Это должно соответствовать полю в таблице accounts
    as: 'authUser', // Алиас для доступа к связанному пользователю в AuthUser
    targetKey: 'id'
});


// Связи для Sessions
// SessionModel.belongsTo(UserModel, {
//     foreignKey: 'user_id',
//     as: 'user'
// })
// UserModel.hasMany(SessionModel, {
//     foreignKey: 'user_id',
//     as: 'sessions'
// })

// Связи для Accounts
// AccountModel.belongsTo(UserModel, {
//     foreignKey: 'user_id',
//     as: 'user'
// })
// UserModel.hasMany(AccountModel, {
//     foreignKey: 'user_id',
//     as: 'accounts'
// })


//файл подключен в root layout
export {
    CartModel,
    ProductModel,
    AddressModel,
    ColorModel,
    OrderedProductsModel,
    OrderModel,
    StockModel,
    ProfileModel,
    AccountModel,
    SessionModel,
    AuthUserModel
}
