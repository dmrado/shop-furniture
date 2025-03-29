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
            grandCategory: row.grandCategory,
            slug: row.slug,
            image: row.image
        }))
    }
}
