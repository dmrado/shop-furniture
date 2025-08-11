'use server'
import { ColorModel, ProductModel } from '@/db/models'
import { InferAttributes, Op } from 'sequelize'
import { ProductVariantModel } from '@/db/models/product_variant.model'
import { CategoryModel } from '@/db/models/category.model'
import { models } from '@auth/sequelize-adapter'

export type Product = InferAttributes<ProductModel>
export type ProductListItem =
    Pick<Product, 'id' | 'name' | 'description_1' | 'old_price' | 'new_price' | 'image' | 'isNew'>
    & { category: string }
// TODO: create category like an object and add it to the ProductModel
export const getProductBiId = async (id: number): Promise<Product | null> => {
    console.log('getProductBiId productId:', id)

    const product = await ProductModel.findByPk(id,
        {
            include: [
                {
                    model: ProductVariantModel,
                    // attributes: [ 'price' ],
                    as: 'variants',
                    include: [{
                        model: ColorModel,
                        as: 'color'
                    }]
                },
                // { model: CategoryModel, as: 'categories' } //todo удалить
            ]
        }
    )
    if (!product) {
        return null
    }
    console.log('product_________________>', product)
    return product.toJSON()
}

export const getProducts = async (categoryIds: number[], offset: number, limit: number):
    Promise<{ count: number, products: ProductListItem[] }> => {
    const { count, rows } = await ProductModel.findAndCountAll({
        limit,
        offset,
        where: {
            isActive: true
        },
        attributes: [ 'id', 'name', 'descriptionShort', 'isNew' ],
        include: [{
            model: CategoryModel,
            as: 'categories',
            attributes: [ 'name' ],
            through: { attributes: [] }, // Исключаем атрибуты промежуточной таблицы
            where: {
                id: { [Op.in]: categoryIds }, // Фильтрация связанных категорий
            },
            required: true, // Обязательно наличие связи с указанными категориями
        }]
    })

    return {
        count,
        products: rows.map(row => ({
            id: row.id,
            name: row.name,
            descriptionShort: row.descriptionShort,
            category: row.categories && row.categories.length > 0 ? row.categories[0].name : '-- Категория по умолчанию --',
            isNew: row.isNew,
        }))
    }
}
