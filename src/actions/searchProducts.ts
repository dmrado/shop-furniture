'use server'

import { Op } from 'sequelize'
import { ProductModel, ProductDTO } from '@/db/models/product.model'
import { ProductVariantModel } from '@/db/models/product_variant.model'
import { ImageModel } from '@/db/models'
import { CategoryModel } from '@/db/models/category.model'

interface GetProductListFilters {
    brandId?: number
    collectionId?: number
    countryId?: number
    styleId?: number
    categoryId?: number
    nameQuery?: string // Добавляем
    articulQuery?: string // Добавляем
}

export async function getProductList(
    page: number = 1,
    limit: number = 10,
    filters: GetProductListFilters = {}
): Promise<{ products: ProductDTO[]; totalCount: number }> {
    try {
        const offset = (page - 1) * limit

        const baseWhereConditions = {
            ...(filters.brandId && { brandId: filters.brandId }),
            ...(filters.collectionId && { collectionId: filters.collectionId }),
            ...(filters.countryId && { countryId: filters.countryId }),
            ...(filters.styleId && { styleId: filters.styleId }),
            ...(filters.nameQuery && { name: { [Op.like]: `%${filters.nameQuery}%` } }),
            ...(filters.articulQuery && {
                [Op.or]: {
                    articul: { [Op.like]: `%${filters.articulQuery}%` },
                    '$variants.articul$': { [Op.like]: `%${filters.articulQuery}%` }
                }
            })
        }

        const includeConditions: any[] = [
            {
                model: ImageModel,
                as: 'images'
            },
            {
                // Когда вы делаете include, вы должны ссылаться на это имя и на конечную модель: include: { model: CategoryModel, as: 'categories' }
                model: CategoryModel,
                as: 'categories',
                required: !!filters.categoryId, // Делаем обязательным только если есть фильтр, логика: filters.categoryId ? true : false
                through: {
                    where: {
                        ...(filters.categoryId && { categoryId: filters.categoryId }) // <-- Условие фильтрации внутри include
                    }
                }
            }
        ]
        if (filters.articulQuery) {
            includeConditions.push({
                model: ProductVariantModel,
                as: 'variants',
                attributes: [],
                required: false
            })
        }

        const { count, rows: products } = await ProductModel.findAndCountAll({
            where: baseWhereConditions,
            include: includeConditions,
            limit: limit,
            offset: offset,
            order: [ [ 'createdAt', 'DESC' ] ],
            // attributes: ['id', 'name', 'descriptionShort', 'isNew'],
            distinct: true, // Возвращает только уникальные строки. Важно для запросов с LEFT JOIN, чтобы избежать дублирования продуктов из-за вариантови получить правильный totalCount.
            col: 'id', // Считать уникальные продукты по их ID
            subQuery: false //Sequelize будет генерировать SQL-запрос без подзапросов для подсчета общего количества (count), что в некоторых случаях также влияет на корректность объединения таблиц и доступность полей в основном WHERE условии для MySQL.
        })
        return {
            products: products.map((p) => p.toJSON() as ProductDTO),
            totalCount: count
        }
    } catch (error: any) {
        console.error('Error getting products list', error)
        throw new Error(`Error getting products list: ${error.message}`)
    }
}
