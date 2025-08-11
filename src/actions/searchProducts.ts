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
            ...(filters.collectionId && { collectionId: filters.collectionId }),
            ...(filters.countryId && { countryId: filters.countryId }),
            ...(filters.styleId && { styleId: filters.styleId })
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

            // `'$variants.articul$'` позволяет обращаться к полю связанной таблицы. используем LEFT JOIN (`required: false`), чтобы продукты, у которых нет вариантов или совпадающих вариантов, не отфильтровывались, если они соответствуют другим условиям поиска (например, по названию).
            searchConditions.push({
                '$variants.articul$': {
                    [Op.like]: `%${filters.articulQuery}%`
                }
            })
            //Добавляем ProductVariantModel в include если ищем по артикулу варианта
            includeConditions.push({
                model: ProductVariantModel,
                as: 'variants',
                attributes: [],
                required: false
            })
        }
        //комбинируем все условия для окончательного объекта where Если есть и основные фильтры, и поисковые запросы находим продукт, если его название совпадает (частично) ИЛИ его собственный артикул совпадает (частично) ИЛИ артикул его варианта совпадает (частично)
        let finalWhereConditions: any = baseWhereConditions
        if (searchConditions.length > 0) {
            if (Object.keys(baseWhereConditions).length > 0) {
                finalWhereConditions = {
                    [Op.and]: [
                        baseWhereConditions,
                        { [Op.or]: searchConditions } // nameQuery, articulQuery (для Product) и articulQuery (для ProductVariant)
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
