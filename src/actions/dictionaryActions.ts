'use server'

import { BrandModel } from '@/db/models/brand.model.ts'
import { CollectionModel } from '@/db/models/collection.model.ts'
import { CountryModel } from '@/db/models/country.model.ts'
import { StyleModel } from '@/db/models/style.model.ts'
import { ProductModel } from '@/db/models/product.model.ts' // Импортируем ProductModel
import { ColorModel } from '@/db/models/color.model.ts'     // Импортируем ColorModel
import { MaterialModel } from '@/db/models/material.model.ts' // НОВЫЙ ИМПОРТ: MaterialModel

// Функция для получения всех активных брендов
export async function getBrands() {
    try {
        const brands = await BrandModel.findAll({
            where: { isActive: true },
            attributes: [ 'id', 'name' ], // Выбираем только id и name
            order: [ [ 'name', 'ASC' ] ], // Сортируем по имени
        })
        return brands.map(brand => brand.toJSON()) // Преобразуем в plain объекты
    } catch (error) {
        console.error('Error fetching brands:', error)
        return []
    }
}

// Функция для получения всех активных коллекций
export async function getCollections() {
    try {
        const collections = await CollectionModel.findAll({
            where: { isActive: true },
            attributes: [ 'id', 'name' ],
            order: [ [ 'name', 'ASC' ] ],
        })
        return collections.map(collection => collection.toJSON())
    } catch (error) {
        console.error('Error fetching collections:', error)
        return []
    }
}

// Функция для получения всех активных стран
export async function getCountries() {
    try {
        const countries = await CountryModel.findAll({
            where: { isActive: true },
            attributes: [ 'id', 'name' ],
            order: [ [ 'name', 'ASC' ] ],
        })
        return countries.map(country => country.toJSON())
    } catch (error) {
        console.error('Error fetching countries:', error)
        return []
    }
}

// Функция для получения всех активных стилей
export async function getStyles() {
    try {
        const styles = await StyleModel.findAll({
            where: { isActive: true },
            attributes: [ 'id', 'name' ],
            order: [ [ 'name', 'ASC' ] ],
        })
        return styles.map(style => style.toJSON())
    } catch (error) {
        console.error('Error fetching styles:', error)
        return []
    }
}

// Новая функция для получения всех продуктов (например, по имени и ID)
export async function getProducts() {
    try {
        const products = await ProductModel.findAll({
            attributes: [ 'id', 'name' ], // Выбираем только id и name
            order: [ [ 'name', 'ASC' ] ],
        })
        return products.map(product => product.toJSON())
    } catch (error) {
        console.error('Error fetching products:', error)
        return []
    }
}

// Новая функция для получения всех активных цветов
export async function getColors() {
    try {
        const colors = await ColorModel.findAll({
            where: { isActive: true },
            attributes: [ 'id', 'name', 'code' ], // Можно взять также 'code', если нужно отображать
            order: [ [ 'name', 'ASC' ] ],
        })
        return colors.map(color => color.toJSON())
    } catch (error) {
        console.error('Error fetching colors:', error)
        return []
    }
}

// НОВАЯ ФУНКЦИЯ: для получения всех активных материалов
export async function getMaterials() {
    try {
        const materials = await MaterialModel.findAll({
            where: { isActive: true },
            attributes: [ 'id', 'name' ], // Выбираем только id и name
            order: [ [ 'name', 'ASC' ] ], // Сортируем по имени
        })
        return materials.map(material => material.toJSON()) // Преобразуем в plain объекты
    } catch (error) {
        console.error('Error fetching materials:', error)
        return []
    }
}