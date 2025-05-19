import {AddressModel} from '@/db/models/address.model'
import {ColorModel} from '@/db/models/color.model'
import {ProductModel} from '@/db/models/product.model'
import {OrderedProductsModel} from '@/db/models/orderedProducts.model'
import {OrderModel} from '@/db/models/order.model'
import {StockModel} from '@/db/models/stock.model'
import {CartModel} from '@/db/models/cart.model'
import {SessionModel} from '@/db/models/sessions.model'
import {AccountModel} from '@/db/models/accounts.model'
import {AuthUserModel} from '@/db/models/users.model'
import {ProfileModel} from "@/db/models/profile.model";
import {CategoryModel} from "@/db/models/category.model";
import {TagModel} from "@/db/models/tag.model";
import {ProductCategoryModel} from "@/db/models/productCategory.model";

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

// StockModel.belongsTo(ProductModel, {
//     // sourceKey: 'id',
//     // foreignKey: 'id',
// })
// ProductModel.hasOne(StockModel, {
//     // targetKey: 'id',
//     foreignKey: 'productId',
//     as: 'stock', // Алиас для связи
// })


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
    foreignKey: 'userId',
    as: 'profiles',
    targetKey: 'id'
})


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

// Для создания самоссылающейся связи
CategoryModel.belongsTo(CategoryModel, {
    foreignKey: 'parentId',
    as: 'parent'
});

CategoryModel.hasMany(CategoryModel, {
    foreignKey: 'parentId',
    as: 'children'
});


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
TagModel.belongsTo(TagModel, {
    foreignKey: "parentId",
    as: "parent",
});

TagModel.hasMany(TagModel, {
    foreignKey: "parentId",
    as: "children",
});

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
})


ProductModel.belongsToMany(CategoryModel, {
    through: ProductCategoryModel,
    foreignKey: 'productId',
    otherKey: 'categoryId',
})

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
    ProfileModel,
    AccountModel,
    SessionModel,
    AuthUserModel
}
