'use server'

import { BrandModel } from '@/db/models/brand.model.ts'
import { CollectionModel } from '@/db/models/collection.model.ts'
import { CountryModel } from '@/db/models/country.model.ts'
import { StyleModel } from '@/db/models/style.model.ts'
import { ColorModel } from '@/db/models/color.model.ts'
import { MaterialModel } from '@/db/models/material.model.ts'
import { DictionaryItem } from '@/db/types/common-types'
import { revalidatePath } from 'next/cache'

// Вспомогательная функция для преобразования 'on'/null в boolean
function parseBooleanFromFormData(value: FormDataEntryValue | null): boolean {
    // Чекбокс возвращает 'on' если отмечен, и null/undefined если не отмечен
    return value === 'true' || value === 'on' // Предполагаем, что вы передаете 'true'/'false' или 'on'
}

export async function getActiveBrands(): Promise<DictionaryItem[]> {
    try {
        const brands = await BrandModel.findAll({
            where: { isActive: true },
            attributes: [ 'id', 'name' ], // Здесь достаточно id и name для выбора в ProductForm
            order: [ [ 'name', 'ASC' ] ],
        })
        return brands.map(brand => brand.toJSON())
    } catch (error) {
        console.error('Ошибка при получении списка активных брендов:', error)
        throw new Error('Не удалось получить список активных брендов.')
    }
}

// 2. Функция для получения ВСЕХ брендов (для BrandManager)
export async function getAllBrands(): Promise<DictionaryItem[]> { // Можно также назвать getBrandsForAdminPanel
    try {
        const brands = await BrandModel.findAll({
            attributes: [ 'id', 'name', 'description', 'isActive' ], // Для BrandManager нужны все атрибуты
            order: [ [ 'name', 'ASC' ] ],
        })
        return brands.map(brand => brand.toJSON())
    } catch (error) {
        console.error('Ошибка при получении полного списка брендов:', error)
        throw new Error('Не удалось получить полный список брендов.')
    }
}

// fixme used by [slug]\page.tsx а не нужна ли там getActiveBrands по логике?
export async function getBrands() {
    const brands = await BrandModel.findAll({
        where: { isActive: true },
        attributes: [ 'id', 'name', 'description', 'isActive' ],
        order: [ [ 'name', 'ASC' ] ],
    })
    return brands.map(brand => brand.toJSON()) as DictionaryItem[]
}

export async function getBrandById(id: number) {
    const brand = await BrandModel.findByPk(id)
    if (!brand) {
        return null
    }
    return brand.toJSON()
}

export async function createBrand(formData: FormData) {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const isActive = parseBooleanFromFormData(formData.get('isActive'))
    if (!name || name.trim().length < 2) {
        throw new Error('Название бренда должно быть не менее 2 символов.')
    }
    if (!description || description.trim().length < 2) {
        throw new Error('Описание бренда должно быть не менее 2 символов.')
    }
    try {
        await BrandModel.create({
            name: name.trim(),
            description: description.trim(),
            isActive: isActive,
        })
        revalidatePath('/admin/brands')
        return { success: true }
    } catch (error) {
        console.error('Ошибка при создании бренда:', error)
        throw new Error('Не удалось создать бренд.')
    }
}

export async function updateBrand(formData: FormData) {
    const id = Number(formData.get('id'))
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const isActive = parseBooleanFromFormData(formData.get('isActive'))
    if (!id) {
        throw new Error('ID бренда отсутствует для обновления.')
    }
    if (!name || name.trim().length < 2) {
        throw new Error('Название бренда должно быть не менее 2 символов.')
    }
    if (!description || description.trim().length < 2) {
        throw new Error('Описание бренда должно быть не менее 2 символов.')
    }
    try {
        const brand = await BrandModel.findByPk(id)
        if (!brand) {
            throw new Error('Бренд не найден.')
        }
        await brand.update({
            name: name.trim(),
            description: description.trim(),
            isActive: isActive,
        })
        revalidatePath('/admin/brands')
        return { success: true }
    } catch (error) {
        console.error('Ошибка при обновлении бренда:', error)
        throw new Error('Не удалось обновить бренд.')
    }
}

export async function removeBrand(id: number) {
    'use server'
    await BrandModel.destroy({ where: { id } })
    revalidatePath('/admin/brands')
    // redirect('/admin/products')
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