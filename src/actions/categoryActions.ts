'use server'
import { CategoryModel } from '@/db/models/category.model'

export const getCategories = async (offset: number):
    Promise<{ count: number, categories }> => {
    const { count, rows } = await CategoryModel.findAndCountAll({
        offset,
    })

    return {
        count,
        categories: rows.map(row => ({
            id: row.id,
            name: row.name,
            parentId: row.parentId,
            slug: row.slug,
            image: row.image
        }))
    }
}

//Наиболее эффективный способ получения дерева категорий можно использовать один запрос с включением (include)
export const getFullCategoryTree = async (): Promise<any[]> => {
    const categories = await CategoryModel.findAll({
        where: {
            parentId: null
        },
        include: [{
            model: CategoryModel,
            as: 'children',
            include: [{
                model: CategoryModel,
                as: 'children'
                // Можно добавить больше уровней вложенности при необходимости
            }]
        }]
    })

    return categories.map(category => category.toJSON())
}

export const getSubCategoryId = async (subCategorySlug) => {
    const category = await CategoryModel.findOne({
        where: {
            slug: subCategorySlug
        }
    })

    return {
        subCategoryId: category ? category.id : null
    }
}

// Функция для получения подкатегорий по ID родительской категории
export const getSubcategories = async (parentId: number): Promise<any[]> => {
    const subcategories = await CategoryModel.findAll({
        where: {
            parentId
        }
    })

    // Рекурсивно получаем подкатегории для каждой подкатегории
    const result = []

    for (const subcategory of subcategories) {
        const children = await getSubcategories(subcategory.id)

        result.push({
            id: subcategory.id,
            name: subcategory.name,
            parentId: subcategory.parentId,
            slug: subcategory.slug,
            image: subcategory.image,
            children
        })
    }

    return result
}

export const getSubCategoryName = async (subCategorySlug) => {
    const category = await CategoryModel.findOne({
        where: {
            slug: subCategorySlug
        }
    })

    return {
        subCategoryName: category ? category.name : null
    }
}