import {CategoryModel} from '@/db/models/category.model'

export const getCategories = async (offset: number, limit: number):
    Promise<{ count: number, categories }> => {
    const {count, rows} = await CategoryModel.findAndCountAll({
        limit,
        offset,
    })

    return {
        count,
        categories: rows.map(row => ({
            id: row.id,
            name: row.name,
            grandCategory: row.grandCategory,
        }))
    }
}
