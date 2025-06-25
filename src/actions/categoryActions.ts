'use server'
import { CategoryModel } from '@/db/models/category.model'

// export const getCategories = async (offset: number):
//     Promise<{ count: number, categories }> => {
//     const { count, rows } = await CategoryModel.findAndCountAll({
//         offset,
//     })
//
//     return {
//         count,
//         categories: rows.map(row => ({
//             id: row.id,
//             name: row.name,
//             parentId: row.parentId,
//             slug: row.slug,
//             image: row.image
//         }))
//     }
// }

export const getCategoryParents = async (categoryId: number): Promise<any[]> => {
    const parents = []
    let category = await CategoryModel.findByPk(categoryId)

    while (category && category.parentId !== null) {
        parents.unshift(category)
        category = await CategoryModel.findByPk(category.parentId)
    }

    parents.unshift(category)
    return parents
}

export const getChildrenIds = async (categories: any[]):Promise<number[]> => {
    if (categories.length === 0) {
        return []
    }
    //todo корневой не итерабельный (хлебные крошки падают на корневом)
    const directChildren = categories.reduce(
        (acc, category) => [ ...acc, ...category.children ],
        []
    )
    return [
        ...categories.map(cat => cat.id),
        // ...directChildren.map(child => child.id),
        ...(await getChildrenIds(directChildren))
    ]
}

//Наиболее эффективный способ получения дерева категорий можно использовать один запрос с включением (include)
export const getCategoryChildren = async (categoryId: number | null = null): Promise<any[]> => {
    const categories = await CategoryModel.findAll({
        where: {
            parentId: categoryId
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
export const getCategory = async (categorySlug: string) => {
    return await CategoryModel.findOne({
        where: {
            slug: categorySlug
        }
    })
}

// export const getCategoryId = async (categorySlug: string) => {
//     const category = await CategoryModel.findOne({
//         where: {
//             slug: categorySlug
//         }
//     })
//
//     return {
//         categoryId: category ? category.id : null
//     }
// }

// Функция для получения подкатегорий по ID родительской категории
// export const getSubcategories = async (categoryId: number): Promise<any[]> => {
//     const subcategories = await CategoryModel.findAll({
//         where: {
//             parentId: categoryId
//         }
//     })
//
//     // Рекурсивно получаем подкатегории для каждой подкатегории
//     const result = []
//
//     for (const subcategory of subcategories) {
//         const children = await getSubcategories(subcategory.id)
//
//         result.push({
//             id: subcategory.id,
//             name: subcategory.name,
//             parentId: subcategory.parentId,
//             slug: subcategory.slug,
//             image: subcategory.image,
//             children
//         })
//     }
//
//     return result
// }

// export const getSubCategoryName = async (subCategorySlug) => {
//     const category = await CategoryModel.findOne({
//         where: {
//             slug: subCategorySlug
//         }
//     })
//
//     return {
//         subCategoryName: category ? category.name : null
//     }
// }