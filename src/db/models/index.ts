import { AddressModel } from '@/db/models/address.model'
import { ColorModel } from '@/db/models/color.model'
import { ProductModel } from '@/db/models/product.model'
import { OrderedProductsModel } from '@/db/models/orderedProducts.model'
import { OrderModel } from '@/db/models/order.model'
import { StockModel } from '@/db/models/stock.model'
// import {OuruserModel} from '@/db/models/ouruser.model'
import { CartModel } from '@/db/models/cart.model'
import { SessionModel } from '@/db/models/sessions.model'
import { AccountModel } from '@/db/models/accounts.model'
import { AuthUser } from '@/db/models/users.model'
import {OuruserModel} from "@/db/models/ouruser.model";
// import {UserModel} from "@/db/models/users.model";

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
CartModel.belongsTo(AuthUser, {
    foreignKey: 'userId',
    as: 'user'
})

// Связи для Users
AddressModel.belongsTo(AuthUser, {
    // targetKey: 'id',
    // foreignKey: 'userId',
})
AuthUser.hasMany(AddressModel, {
    // sourceKey: 'id',
    foreignKey: 'userId',
    as: 'addresses', // Алиас для связи
})


AuthUser.hasOne(OuruserModel, {
    // sourceKey: 'id',
    foreignKey: 'authUserId',
    as: 'ourUser', // Алиас для связи с OuruserModel
})

OuruserModel.belongsTo(AuthUser, {
    foreignKey: 'authUserId', // То же имя внешнего ключа в таблице ouruser
    as: 'authUser',       // Алиас для доступа к связанному пользователю в AuthUser
    targetKey: 'id'   // Поле в AuthUser, на которое ссылается внешний ключ
});

//todo так как при входе через разных провайдеров каждый раз создается запись и в AuthUser и в AccountModel, то видимо нужна связь один-к-одному
AuthUser.hasMany(AccountModel, {
    foreignKey: 'userId', // Это поле в таблице accounts
    as: 'accounts',
    sourceKey: 'id'
});

AccountModel.belongsTo(AuthUser, {
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
    OuruserModel,
    AccountModel,
    SessionModel
}
