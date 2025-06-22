import { AddressModel } from '@/db/models/address.model'
import { ColorModel } from '@/db/models/color.model'
import { StyleModel } from '@/db/models/style.model'
import { OrderedProductsModel } from '@/db/models/ordered_products.model'
import { OrderModel } from '@/db/models/order.model'
import { StockModel } from '@/db/models/stock.model'
import { CartModel } from '@/db/models/cart.model'
import { SessionModel } from '@/db/models/sessions.model'
import { AccountModel } from '@/db/models/accounts.model'
import { AuthUserModel } from '@/db/models/users.model'
import { ProfileModel } from '@/db/models/profile.model'
import { CategoryModel } from '@/db/models/category.model'
// import {TagModel} from "@/db/models/tag.model";
import { ProductCategoryModel } from '@/db/models/product_category.model'
import { ProductVariantModel } from '@/db/models/product_variant.model'
import { ProductModel } from '@/db/models/product.model'

// Установка связей
// ProductModel.belongsTo(ColorModel, { as: 'primaryColor', foreignKey: 'primary_color' })
// ProductModel.belongsTo(ColorModel, { as: 'secondaryColor', foreignKey: 'secondary_color' })


OrderModel.hasMany(OrderedProductsModel, {
    foreignKey: 'orderId',
    as: 'products'
})
OrderedProductsModel.belongsTo(OrderModel, {
    // foreignKey: 'order'
})


ProductVariantModel.belongsTo(ColorModel, {
    foreignKey: 'colorId',
    as: 'color' // Имя ассоциации, которое используем в include
})
ColorModel.hasMany(ProductVariantModel, {
    foreignKey: 'colorId',
    as: 'variants' // Имя ассоциации, под которым вы сможете получать продукт
})


ProductModel.belongsTo(StyleModel, {
    foreignKey: 'styleId',
    as: 'style' // Имя ассоциации, которое используем в include
})
StyleModel.hasMany(ProductModel, {
    foreignKey: 'styleId',
    as: 'products' // Имя ассоциации, под которым вы сможете получать продукт
})


ProductModel.hasMany(ProductVariantModel, {
    foreignKey: 'productId',
    as: 'variants' // Имя ассоциации, которое используем в include
})
ProductVariantModel.belongsTo(ProductModel, {
    foreignKey: 'productId',
    as: 'product' // Имя ассоциации, под которым вы сможете получать продукт
})


// 🛒 Корзина говорит: "У меня много вариантов товара"
// CartModel.hasMany(ProductVariantModel, {
//     foreignKey: 'cartId',
//     as: 'product_variants'
// })
//
// // todo что-то здесь не то в логике📦 Вариант товара говорит: "Я принадлежу одной корзине"
// ProductVariantModel.belongsTo(CartModel, {
//     foreignKey: 'cartId',
//     as: 'cart'
// })


// 1. CartModel принадлежит одному варианту продукта
CartModel.belongsTo(ProductVariantModel, {
    foreignKey: 'productVariant', // Это имя поля в CartModel
    as: 'product_variants'
})
// 2. Вариант продукта может быть во многих записях корзины (если нужно)
// ProductVariantModel.hasMany(CartModel, {
//     foreignKey: 'productVariant',
//     as: 'cartItems' // Или любое другое подходящее имя
// });


//todo удалить так как мы теперь наполняем корзину вариантами продуктов
// CartModel.belongsTo(ProductModel, {
//     foreignKey: 'productId',
//     as: 'product'
// })

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
    foreignKey: 'userId',
    as: 'profiles',
    targetKey: 'id'
})


//так как при входе через разных провайдеров каждый раз создается запись и в AuthUser и в AccountModel, то выбрана связь один-к-одному
AuthUserModel.hasOne(AccountModel, {
    foreignKey: 'userId', // Это поле в таблице accounts
    as: 'accounts',
    sourceKey: 'id'
})
AccountModel.belongsTo(AuthUserModel, {
    foreignKey: 'userId', // Это должно соответствовать полю в таблице accounts
    as: 'authUser', // Алиас для доступа к связанному пользователю в AuthUser
    targetKey: 'id'
})

// Для создания самоссылающейся связи
CategoryModel.belongsTo(CategoryModel, {
    foreignKey: 'parentId',
    as: 'parent'
})

CategoryModel.hasMany(CategoryModel, {
    foreignKey: 'parentId',
    as: 'children'
})

// Связь "один-ко-многим" между категорией и продуктами
// CategoryModel.hasMany(ProductModel, {
//     foreignKey: 'categoryId', // Это поле нужно добавить в ProductModel
//     as: 'products'
// });

// Обратная связь от продукта к категории
// ProductModel.belongsTo(CategoryModel, {
//     foreignKey: 'categoryId',
//     as: 'category'
// });

// Связь тега с родительским тегом (для организации иерархии)
// TagModel.belongsTo(TagModel, {
//     foreignKey: "parentId",
//     as: "parent",
// });
//
// TagModel.hasMany(TagModel, {
//     foreignKey: "parentId",
//     as: "children",
// });

// Связь многие-ко-многим с продуктами
// TagModel.belongsToMany(ProductModel, {
//   through: "product_tags", // Промежуточная таблица
//   foreignKey: "tagId",
//   otherKey: "productId",
//   as: "products",
// });
//
// ProductModel.belongsToMany(TagModel, {
//   through: "product_tags", // Промежуточная таблица
//   foreignKey: "productId",
//   otherKey: "tagId",
//   as: "tags",
// });

CategoryModel.belongsToMany(ProductModel, {
    through: ProductCategoryModel,
    foreignKey: 'categoryId',
    otherKey: 'productId',
    as: 'products'
})
ProductModel.belongsToMany(CategoryModel, {
    through: ProductCategoryModel,
    foreignKey: 'productId',
    otherKey: 'categoryId',
    as: 'categories'
})

// StockModel.belongsTo(ProductModel, {
//     // sourceKey: 'id',
//     // foreignKey: 'id',
// })
// ProductModel.hasOne(StockModel, {
//     // targetKey: 'id',
//     foreignKey: 'productId',
//     as: 'stock', // Алиас для связи
// })


// Создание промежуточной таблицы для связи многие-ко-многим
// const ProductCategory = sequelize.define('ProductCategory', {}, { timestamps: false });
//
// CategoryModel.belongsToMany(ProductModel, {
//     through: ProductCategory,
//     foreignKey: 'categoryId',
//     otherKey: 'productId',
//     as: 'products'
// });
//
// ProductModel.belongsToMany(CategoryModel, {
//     through: ProductCategory,
//     foreignKey: 'productId',
//     otherKey: 'categoryId',
//     as: 'categories'
// });

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
    StyleModel,
    ProfileModel,
    AccountModel,
    SessionModel,
    AuthUserModel,
    ProductVariantModel
}
