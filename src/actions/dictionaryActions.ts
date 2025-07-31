'use server'

import { BrandModel } from '@/db/models/brand.model.ts'
import { CollectionModel } from '@/db/models/collection.model.ts'
import { CountryModel } from '@/db/models/country.model.ts'
import { StyleModel } from '@/db/models/style.model.ts'
import { ColorModel } from '@/db/models/color.model.ts'
import { MaterialModel } from '@/db/models/material.model.ts'
import { DictionaryItem } from '@/db/types/common-types'

// Функция для получения всех активных брендов
export async function getBrands() {
    const brands = await BrandModel.findAll({
        where: { isActive: true },
        attributes: [ 'id', 'name' ],
        order: [ [ 'name', 'ASC' ] ],
    })
    return brands.map(brand => brand.toJSON()) as DictionaryItem[]
}

// Функция для получения всех активных коллекций
export async function getCollections() {
    const collections = await CollectionModel.findAll({
        where: { isActive: true },
        attributes: [ 'id', 'name' ],
        order: [ [ 'name', 'ASC' ] ],
    })
    return collections.map(collection => collection.toJSON()) as DictionaryItem[]
}

// Функция для получения всех активных стран
export async function getCountries() {
    const countries = await CountryModel.findAll({
        where: { isActive: true },
        attributes: [ 'id', 'name' ],
        order: [ [ 'name', 'ASC' ] ],
    })
    return countries.map(country => country.toJSON()) as DictionaryItem[]
}

// Функция для получения всех активных стилей
export async function getStyles() {
    const styles = await StyleModel.findAll({
        where: { isActive: true },
        attributes: [ 'id', 'name' ],
        order: [ [ 'name', 'ASC' ] ],
    })
    return styles.map(style => style.toJSON()) as DictionaryItem[]
}

// Новая функция для получения всех продуктов (например, по имени и ID)
// export async function getProducts() {
//     try {
//         const products = await ProductModel.findAll({
//             attributes: [ 'id', 'name' ], // Выбираем только id и name
//             order: [ [ 'name', 'ASC' ] ],
//         })
//         return products.map(product => product.toJSON())
//     } catch (error) {
//         console.error('Error fetching products:', error)
//         return []
//     }
// }

// Новая функция для получения всех активных цветов
export async function getColors() {
    const colors = await ColorModel.findAll({
        where: { isActive: true },
        attributes: [ 'id', 'name', 'code' ],
        order: [ [ 'name', 'ASC' ] ],
    })
    return colors.map(color => color.toJSON()) as DictionaryItem[]
}

// НОВАЯ ФУНКЦИЯ: для получения всех активных материалов
export async function getMaterials() {
    const materials = await MaterialModel.findAll({
        where: { isActive: true },
        attributes: [ 'id', 'name' ],
        order: [ [ 'name', 'ASC' ] ],
    })
    return materials.map(material => material.toJSON()) as DictionaryItem[]
}