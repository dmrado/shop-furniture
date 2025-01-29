'use server'
import {ProductModel} from '@/db/models'
import {InferAttributes} from "sequelize"

export type Product = InferAttributes<ProductModel>
export type ProductListItem = Pick<Product, 'id'| 'name'| 'description_1' | 'old_price' | 'new_price' | 'image' | 'isNew' > & {category: string}
// TODO: create category like an object and add it to the ProductModel
export const getProductBiId = async (id: number): Promise<Product | null> => {
    console.log('getProductBiId productId:', id)

    const product = await ProductModel.findByPk(id)
    if (!product) {
        return null
    }
    return product.toJSON()
}

export const getProducts = async (offset: number, limit: number):
    Promise<{ count: number, products: ProductListItem[] }> => {
    const {count, rows} = await ProductModel.findAndCountAll({
        limit,
        offset,
        where: {isActive: true},
        attributes: ['id', 'name', 'description_1', 'old_price', 'new_price', 'image', 'isNew'],
    })

    return {
        count,
        products: rows.map(row => ({
            id: row.id,
            name: row.name,
            description_1: row.description_1,
            old_price: row.old_price,
            new_price: row.new_price,
            image: row.image,
            category: '-- Категория по умочанию -- ', // TODO: create category model
            isNew: row.isNew,
        }))
    }
}
