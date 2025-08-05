'use server'

import { Op } from 'sequelize'
import { ProductModel, ProductDTO } from '@/db/models/product.model'
import { ProductVariantModel } from '@/db/models/product_variant.model' // Убедитесь, что импорт есть

interface GetProductListFilters {
    brandId?: number
    collectionId?: number
    countryId?: number
    styleId?: number
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
            ...(filters.collectionId && { brandId: filters.collectionId }),
            ...(filters.countryId && { brandId: filters.countryId }),
            ...(filters.styleId && { brandId: filters.styleId })
        }

        //Условия поиска по nameQuery и articulQuery
        const searchConditions: any[] = []

        if (filters.nameQuery) {
            searchConditions.push({
                name: {
                    [Op.like]: `%${filters.nameQuery}%`
                }
            })
        }
        const includeConditions: any[] = []
        if (filters.articulQuery) {
            // Условие для поиска по артикулу самого продукта
            searchConditions.push({
                articul: {
                    [Op.like]: `%${filters.articulQuery}%`
                }
            })

            // `'$variants.articul$'` позволяет обращаться к полю связанной таблицы.
            searchConditions.push({
                '$variants.articul$': {
                    [Op.like]: `%${filters.articulQuery}%`
                }
            })
            //Добавляеем ProductVariantModel в include если ищем по артикулу варианта
            includeConditions.push({
                model: ProductVariantModel,
                as: 'variants',
                attributes: [],
                required: false
            })
        }
        //комбинируем все условия для окончательного объекта where
        let finalWhereConditions: any = baseWhereConditions
        if (searchConditions.length > 0) {
            if (Object.keys(baseWhereConditions).length > 0) {
                finalWhereConditions = {
                    [Op.or]: [
                        baseWhereConditions,
                        { [Op.or]: searchConditions }
                    ]
                }
            } else {
                finalWhereConditions = {
                    [Op.or]: searchConditions
                }
            }
        }
        // Если searchConditions пуст, то finalWhereConditions останется равным baseWhereConditions (стандартные фильтры)
        const { count, rows: products } = await ProductModel.findAndCountAll({
            where: finalWhereConditions,
            include: includeConditions,
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']],
            // attributes: ['id', 'name', 'descriptionShort', 'isNew'],
            // Важно для запросов с LEFT JOIN, чтобы избежать дублирования продуктов из-за вариантови получить правильный totalCount.
            distinct: true,
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
