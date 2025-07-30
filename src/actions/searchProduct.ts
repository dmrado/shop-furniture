'use server'

import { Op } from 'sequelize'
import { ProductModel, ProductDTO } from '@/db/models/product.model'
import { ProductVariantModel } from '@/db/models/product_variant.model' // Убедитесь, что импорт есть
import { revalidatePath } from 'next/cache' // Может не понадобиться, если только читаем

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
): Promise<{ products: ProductDTO[], totalCount: number }> {
    try {
        const offset = (page - 1) * limit
        const whereConditions: any = {}
        const includeConditions: any = [] // Массив для включения связанных моделей

        // 1. Применяем стандартные фильтры (если есть)
        if (filters.brandId) {
            whereConditions.brandId = filters.brandId
        }
        if (filters.collectionId) {
            whereConditions.collectionId = filters.collectionId
        }
        if (filters.countryId) {
            whereConditions.countryId = filters.countryId
        }
        if (filters.styleId) {
            whereConditions.styleId = filters.styleId
        }

        // 2. Добавляем условия поиска по nameQuery и articulQuery
        // Мы будем использовать OR-условие на верхнем уровне,
        // чтобы продукт находился, если он соответствует ЛЮБОМУ из поисковых критериев.
        const searchConditions: any[] = []

        if (filters.nameQuery) {
            searchConditions.push({
                name: {
                    [Op.like]: `%${filters.nameQuery}%`,
                },
            })
        }

        if (filters.articulQuery) {
            // Условие для поиска по артикулу самого продукта
            searchConditions.push({
                articul: {
                    [Op.like]: `%${filters.articulQuery}%`,
                },
            })

            // Условие для поиска по артикулу в ProductVariantModel
            // Мы используем LEFT JOIN (`required: false`), чтобы продукты,
            // у которых нет вариантов или совпадающих вариантов, не отфильтровывались,
            // если они соответствуют другим условиям поиска (например, по названию).
            // `'$variants.articul$'` позволяет обращаться к полю связанной таблицы.
            searchConditions.push({
                '$variants.articul$': {
                    [Op.like]: `%${filters.articulQuery}%`,
                },
            })

            // Добавляем ProductVariantModel в include, если ищем по артикулу варианта
            includeConditions.push({
                model: ProductVariantModel,
                as: 'variants', // Важно: используйте тот же alias, что и в вашей ассоциации
                attributes: [], // Не выбираем данные вариантов в конечный результат
                required: false, // LEFT JOIN
            })
        }

        // 3. Комбинируем все условия:
        // Если есть и основные фильтры, и поисковые запросы находим продукт, если его название совпадает (частично) ИЛИ его собственный артикул совпадает (частично) ИЛИ артикул его варианта совпадает (частично)
        if (Object.keys(whereConditions).length > 0 && searchConditions.length > 0) {
            // Условия будут: (основные фильтры) И (поиск1 ИЛИ поиск2 ИЛИ поиск3)
            whereConditions[Op.and] = [
                whereConditions, // Ваши brandId, collectionId и т.д.
                { [Op.or]: searchConditions } // nameQuery, articulQuery (для Product) и articulQuery (для ProductVariant)
            ]
        } else if (searchConditions.length > 0) {
            // Если есть только поисковые запросы (без brandId, collectionId и т.д.)
            whereConditions[Op.or] = searchConditions
        }
        // Если searchConditions пуст, то останутся только whereConditions (стандартные фильтры)

        const { count, rows: products } = await ProductModel.findAndCountAll({
            where: whereConditions,
            include: includeConditions,
            limit: limit,
            offset: offset,
            order: [ [ 'createdAt', 'DESC' ] ],
            // Важно для запросов с LEFT JOIN, чтобы избежать дублирования продуктов из-за вариантов
            // и получить правильный totalCount.
            distinct: true,
            col: 'id', // Считать уникальные продукты по их ID
            subQuery: false //Sequelize будет генерировать SQL-запрос без подзапросов для подсчета общего количества (count), что в некоторых случаях также влияет на корректность объединения таблиц и доступность полей в основном WHERE условии для MySQL.
        })

        return { products: products.map(p => p.toJSON() as ProductDTO), totalCount: count }
    } catch (error: any) {
        console.error('Ошибка в getProductList:', error)
        throw new Error(`Не удалось получить список продуктов: ${error.message}`)
    }
}