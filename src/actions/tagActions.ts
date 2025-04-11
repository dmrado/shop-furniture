import { TagModel } from "@/db/models/tag.model"

//todo доделать получение products для вызова по тегам
export const getTags = async ():
    Promise<{ count: number, tags }> => {
    const { count, rows } = await TagModel.findAndCountAll({
        
    })

    return {
        count,
        tags: rows.map(row => ({
            id: row.id,
            name: row.name,
            parentId: row.parentId,
            slug: row.slug,
        }))
    }
}
