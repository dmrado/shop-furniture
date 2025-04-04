'use server'
import {CategoryModel} from '@/db/models/category.model'


export const getMainCategories = async (): Promise<{ count: number, mainCategories: [] }> => {
    const {count, rows} = await CategoryModel.findAndCountAll({
        where: {
            parentId: null
        }
    })
    return{
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
