'use server'
import {CategoryModel} from '@/db/models/category.model'


export const getCategories = async (offset: number):
    Promise<{ count: number, categories }> => {
    const {count, rows} = await CategoryModel.findAndCountAll({
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


export const getMainCategories = async (offset: number, limit: number): Promise<{
    count: number,
    mainCategories: []
}> => {
    const {count, rows} = await CategoryModel.findAndCountAll({
        where: {
            parentId: null
        },
        offset,
        limit
    })
    return {
        countMainCategories: count,
        mainCategories: rows.map(row => ({
                id: row.id,
                name: row.name,
                parentId: row.parentId,
                slug: row.slug,
                image: row.image
            })
        )
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
    });

    return categories;
}

//Запасные варианты
// Функция для получения подкатегорий по ID родительской категории
export const getSubcategories = async (parentId: number): Promise<any[]> => {
    const subcategories = await CategoryModel.findAll({
        where: {
            parentId
        }
    });

    // Рекурсивно получаем подкатегории для каждой подкатегории
    const result = [];

    for (const subcategory of subcategories) {
        const children = await getSubcategories(subcategory.id);

        result.push({
            id: subcategory.id,
            name: subcategory.name,
            parentId: subcategory.parentId,
            slug: subcategory.slug,
            image: subcategory.image,
            children
        });
    }

    return result;
}

//Функция для получения полного дерева категорий
export const getCategoryTree = async (): Promise<any[]> => {
    const mainCategories = await getMainCategories(0, 1000);

    const result = [];

    for (const category of mainCategories.mainCategories) {
        const children = await getSubcategories(category.id);

        result.push({
            ...category,
            children
        });
    }

    return result;
}