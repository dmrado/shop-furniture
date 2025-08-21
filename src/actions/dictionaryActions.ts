'use server'

import { BrandModel } from '@/db/models/brand.model.ts'
import { CollectionModel } from '@/db/models/collection.model.ts'
import { CountryModel } from '@/db/models/country.model.ts'
import { StyleModel } from '@/db/models/style.model.ts'
import { ColorModel } from '@/db/models/color.model.ts'
import { MaterialModel } from '@/db/models/material.model.ts'
import { DictionaryItem } from '@/db/types/common-types'
import { revalidatePath } from 'next/cache'
import { CategoryModel } from '@/db/models/category.model'
import { Op } from 'sequelize'

// Вспомогательная функция для преобразования 'on'/null в boolean
function parseBooleanFromFormData(value: FormDataEntryValue | null): boolean {
    // Чекбокс возвращает 'on' если отмечен, и null/undefined если не отмечен
    return value === 'true' || value === 'on' // Предполагаем, что вы передаете 'true'/'false' или 'on'
}

// ------------------- Функции для Брендов -------------------
//1. Функция для получения ТОЛЬКО АКТИВНЫХ брендов (для фильтров, ProductFilterListForm)
export async function getActiveBrands(): Promise<DictionaryItem[]> {
    try {
        // todo заменить where на три состояния актив, moderate, deleted
        const brands = await BrandModel.findAll({
            where: [{ isActive: true }, { isDeleted: false }],
            attributes: ['id', 'name'], // Здесь достаточно id и name для выбора в ProductForm
            order: [['name', 'ASC']]
        })
        return brands.map((brand) => brand.toJSON())
    } catch (error) {
        console.error('Ошибка при получении списка активных брендов:', error)
        throw new Error('Не удалось получить список активных брендов.')
    }
}

// 2. Функция для получения ВСЕХ брендов (для BrandManager)
export async function getAllBrands(): Promise<DictionaryItem[]> {
    // Можно также назвать getBrandsForAdminPanel
    try {
        const brands = await BrandModel.findAll({
            where: { isDeleted: false },
            attributes: ['id', 'name', 'description', 'isActive'], // Для BrandManager нужны все атрибуты
            order: [['name', 'ASC']]
        })
        return brands.map((brand) => brand.toJSON())
    } catch (error) {
        console.error('Ошибка при получении полного списка брендов:', error)
        throw new Error('Не удалось получить полный список брендов.')
    }
}

// fixme used by [slug]\page.tsx а не нужна ли там getActiveBrands по логике?
export async function getBrands(): Promise<DictionaryItem[]> {
    const brands = await BrandModel.findAll({
        where: { isActive: true },
        attributes: ['id', 'name', 'description', 'isActive'],
        order: [['name', 'ASC']]
    })
    return brands.map((brand) => brand.toJSON()) as DictionaryItem[]
}

export async function getBrandById(id: number): Promise<DictionaryItem | null> {
    const brand = await BrandModel.findByPk(id)
    if (!brand) {
        return null
    }
    return brand.toJSON() as DictionaryItem
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
            isActive: isActive
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
            isActive: isActive
        })
        revalidatePath('/admin/brands')
        return { success: true }
    } catch (error) {
        console.error('Ошибка при обновлении бренда:', error)
        throw new Error('Не удалось обновить бренд.')
    }
}

// ФУНКЦИЯ ДЛЯ "МЯГКОГО" УДАЛЕНИЯ БРЕНДА
export async function softDeleteBrand(id: number) {
    if (!id) {
        throw new Error('ID бренда отсутствует для удаления.')
    }
    try {
        const brand = await BrandModel.findByPk(id)
        if (!brand) {
            throw new Error(`Бренд с ID ${id} не найден.`)
        }
        // Обновляем поле isDeleted на true вместо удаления
        await brand.update({ isDeleted: true })
        // revalidatePath('/admin/brands')
        return { success: true }
    } catch (error) {
        console.error('Ошибка при мягком удалении бренда:', error)
        throw new Error('Не удалось удалить бренд.')
    }
}

export async function removeBrand(id: number) {
    'use server'
    await BrandModel.destroy({ where: { id } })
    revalidatePath('/admin/brands')
}

/**
 * Ищет бренды по названию, используя частичное совпадение.
 * @param {string} name - Часть названия бренда для поиска.
 * @returns {Promise<DictionaryItem[]>} - Найденные бренды.
 */
// для модальных окон в форме доавления продукта
export async function searchBrandByName(name: string) {
    try {
        console.log('Поиск брендов по названию:', name)
        const brands = await BrandModel.findAll({
            where: {
                name: {
                    [Op.like]: `%${name.toLowerCase()}%`
                },
                isDeleted: false
            },
            attributes: [ 'id', 'name', 'isActive' ],
            limit: 10,
            order: [ [ 'name', 'ASC' ] ]
        })
        console.log('Результаты поиска стран:', brands.map(c => c.toJSON()))

        return brands.map(brand => brand.toJSON()) as DictionaryItem[]
    } catch (error) {
        console.error('Ошибка при поиске брендов по названию:', error)
        return []
    }
}

// ------------------- Функции для Коллекций -------------------
// Функция для получения всех активных коллекций
export async function getActiveCollections(): Promise<DictionaryItem[]> {
    const collections = await CollectionModel.findAll({
        where: { isActive: true },
        attributes: [ 'id', 'name' ],
        order: [ [ 'name', 'ASC' ] ]
    })
    return collections.map((collection) => collection.toJSON()) as DictionaryItem[]
}

export async function getAllCollections(): Promise<DictionaryItem[]> {
    try {
        const collections = await CollectionModel.findAll({
            attributes: [ 'id', 'name', 'description', 'isActive' ],
            order: [ [ 'name', 'ASC' ] ]
        })
        return collections.map((collection) => collection.toJSON())
    } catch (error) {
        console.error('Ошибка при получении полного списка коллекций:', error)
        throw new Error('Не удалось получить полный список коллекций.')
    }
}

export async function getCollectionById(id: number): Promise<DictionaryItem | null> {
    const collection = await CollectionModel.findByPk(id)
    if (!collection) {
        return null
    }
    return collection.toJSON() as DictionaryItem
}

export async function createCollection(formData: FormData) {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const isActive = parseBooleanFromFormData(formData.get('isActive'))
    if (!name || name.trim().length < 2) {
        throw new Error('Название коллекции должно быть не менее 2 символов.')
    }
    if (!description || description.trim().length < 2) {
        throw new Error('Описание коллекции должно быть не менее 2 символов.')
    }
    try {
        await CollectionModel.create({
            name: name.trim(),
            description: description.trim(),
            isActive: isActive
        })
        revalidatePath('/admin/collections')
        return { success: true }
    } catch (error) {
        console.error('Ошибка при создании коллекции:', error)
        throw new Error('Не удалось создать коллекцию.')
    }
}

export async function updateCollection(formData: FormData) {
    const id = Number(formData.get('id'))
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const isActive = parseBooleanFromFormData(formData.get('isActive'))
    if (!id) {
        throw new Error('ID коллекции отсутствует для обновления.')
    }
    if (!name || name.trim().length < 2) {
        throw new Error('Название коллекции должно быть не менее 2 символов.')
    }
    if (!description || description.trim().length < 2) {
        throw new Error('Описание коллекции должно быть не менее 2 символов.')
    }
    try {
        const collection = await CollectionModel.findByPk(id)
        if (!collection) {
            throw new Error('Коллекция не найдена.')
        }
        await collection.update({
            name: name.trim(),
            description: description.trim(),
            isActive: isActive
        })
        revalidatePath('/admin/collections')
        return { success: true }
    } catch (error) {
        console.error('Ошибка при обновлении коллекции:', error)
        throw new Error('Не удалось обновить коллекцию.')
    }
}

export async function removeCollection(id: number) {
    //fixme удалить   'use server'
    'use server'
    await CollectionModel.destroy({ where: { id } })
    revalidatePath('/admin/collections')
}

//для модального окна для исключения дубликатов
export async function searchCollectionsByName(name: string) {
    try {
        const collections = await CollectionModel.findAll({
            where: {
                name: {
                    [Op.like]: `%${name.toLowerCase()}%`
                },
                //todo раскомментировать после добавлления функционала как для collections
                // isDeleted: false // Исключаем "мягко" удаленные записи
            },
            attributes: [ 'id', 'name', 'isActive' ],
            limit: 10,
            order: [ [ 'name', 'ASC' ] ]
        })
        console.log('Результаты поиска коллекций:', collections.map(c => c.toJSON()))

        return collections.map((collection) => collection.toJSON()) as DictionaryItem[]
    } catch (error) {
        console.error('Ошибка при поиске коллекций по названию:', error)
        return []
    }
}

// ------------------- Функции для Стран -------------------
// Функция для получения всех активных стран
export async function getActiveCountries(): Promise<DictionaryItem[]> {
    const countries = await CountryModel.findAll({
        where: { isActive: true },
        attributes: ['id', 'name'],
        order: [['name', 'ASC']]
    })
    return countries.map((country) => country.toJSON()) as DictionaryItem[]
}

export async function getAllCountries(): Promise<DictionaryItem[]> {
    try {
        const countries = await CountryModel.findAll({
            attributes: ['id', 'name', 'description', 'isActive'],
            order: [['name', 'ASC']]
        })
        return countries.map((country) => country.toJSON())
    } catch (error) {
        console.error('Ошибка при получении полного списка стран:', error)
        throw new Error('Не удалось получить полный список стран.')
    }
}

export async function getCountryById(id: number): Promise<DictionaryItem | null> {
    const country = await CountryModel.findByPk(id)
    if (!country) {
        return null
    }
    return country.toJSON() as DictionaryItem
}

export async function createCountry(formData: FormData) {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const isActive = parseBooleanFromFormData(formData.get('isActive'))
    if (!name || name.trim().length < 2) {
        throw new Error('Название страны должно быть не менее 2 символов.')
    }
    if (!description || description.trim().length < 2) {
        throw new Error('Описание страны должно быть не менее 2 символов.')
    }
    try {
        await CountryModel.create({
            name: name.trim(),
            description: description.trim(),
            isActive: isActive
        })
        revalidatePath('/admin/countries')
        return { success: true }
    } catch (error) {
        console.error('Ошибка при создании страны:', error)
        throw new Error('Не удалось создать страну.')
    }
}

export async function updateCountry(formData: FormData) {
    const id = Number(formData.get('id'))
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const isActive = parseBooleanFromFormData(formData.get('isActive'))
    if (!id) {
        throw new Error('ID страны отсутствует для обновления.')
    }
    if (!name || name.trim().length < 2) {
        throw new Error('Название страны должно быть не менее 2 символов.')
    }
    if (!description || description.trim().length < 2) {
        throw new Error('Описание страны должно быть не менее 2 символов.')
    }
    try {
        const country = await CountryModel.findByPk(id)
        if (!country) {
            throw new Error('Страна не найдена.')
        }
        await country.update({
            name: name.trim(),
            description: description.trim(),
            isActive: isActive
        })
        revalidatePath('/admin/countries')
        return { success: true }
    } catch (error) {
        console.error('Ошибка при обновлении страны:', error)
        throw new Error('Не удалось обновить страну.')
    }
}

// ФУНКЦИЯ ДЛЯ "МЯГКОГО" УДАЛЕНИЯ Страны
// todo добавить в модель состояние isDeleted
export async function softDeleteCountry(id: number) {
    if (!id) {
        throw new Error('ID страны отсутствует для удаления.')
    }
    try {
        const country = await CountryModel.findByPk(id)
        if (!country) {
            throw new Error(`Страна с ID ${id} не найдена.`)
        }
        // Обновляем поле isDeleted на true вместо удаления
        await country.update({ isDeleted: true })
        revalidatePath('/admin/countries')
        return { success: true }
    } catch (error) {
        console.error('Ошибка при мягком удалении страны:', error)
        throw new Error('Не удалось удалить страну.')
    }
}

//для модального окна для исключения дубликатов
export async function searchCountriesByName(name: string) {
    try {
        console.log('Поиск стран по названию:', name)
        const countries = await CountryModel.findAll({
            where: {
                name: {
                    [Op.like]: `%${name.toLowerCase()}%`
                },
                //todo раскомментировать после добавлления функционала как для брендов
                // isDeleted: false // Исключаем "мягко" удаленные записи
            },
            attributes: [ 'id', 'name', 'isActive' ],
            limit: 10,
            order: [ [ 'name', 'ASC' ] ]
        })

        console.log('Результаты поиска стран:', countries.map(c => c.toJSON()))

        return countries.map((country) => country.toJSON()) as DictionaryItem[]
    } catch (error) {
        console.error('Ошибка при поиске стран по названию:', error)
        return []
    }
}

// ------------------- Функции для Стилей -------------------
// Функция для получения всех активных стилей
export async function getActiveStyles(): Promise<DictionaryItem[]> {
    const styles = await StyleModel.findAll({
        where: { isActive: true },
        attributes: ['id', 'name'],
        order: [['name', 'ASC']]
    })
    return styles.map((style) => style.toJSON()) as DictionaryItem[]
}

export async function getAllStyles(): Promise<DictionaryItem[]> {
    try {
        const styles = await StyleModel.findAll({
            attributes: ['id', 'name', 'description', 'isActive'],
            order: [['name', 'ASC']]
        })
        return styles.map((style) => style.toJSON())
    } catch (error) {
        console.error('Ошибка при получении полного списка стилей:', error)
        throw new Error('Не удалось получить полный список стилей.')
    }
}

export async function getStyleById(id: number): Promise<DictionaryItem | null> {
    const style = await StyleModel.findByPk(id)
    if (!style) {
        return null
    }
    return style.toJSON() as DictionaryItem
}

export async function createStyle(formData: FormData) {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const isActive = parseBooleanFromFormData(formData.get('isActive'))
    if (!name || name.trim().length < 2) {
        throw new Error('Название стиля должно быть не менее 2 символов.')
    }
    if (!description || description.trim().length < 2) {
        throw new Error('Описание стиля должно быть не менее 2 символов.')
    }
    try {
        await StyleModel.create({
            name: name.trim(),
            description: description.trim(),
            isActive: isActive
        })
        revalidatePath('/admin/styles')
        return { success: true }
    } catch (error) {
        console.error('Ошибка при создании стиля:', error)
        throw new Error('Не удалось создать стиль.')
    }
}

export async function updateStyle(formData: FormData) {
    const id = Number(formData.get('id'))
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const isActive = parseBooleanFromFormData(formData.get('isActive'))
    if (!id) {
        throw new Error('ID стиля отсутствует для обновления.')
    }
    if (!name || name.trim().length < 2) {
        throw new Error('Название стиля должно быть не менее 2 символов.')
    }
    if (!description || description.trim().length < 2) {
        throw new Error('Описание стиля должно быть не менее 2 символов.')
    }
    try {
        const style = await StyleModel.findByPk(id)
        if (!style) {
            throw new Error('Стиль не найден.')
        }
        await style.update({
            name: name.trim(),
            description: description.trim(),
            isActive: isActive
        })
        revalidatePath('/admin/styles')
        return { success: true }
    } catch (error) {
        console.error('Ошибка при обновлении стиля:', error)
        throw new Error('Не удалось обновить стиль.')
    }
}

export async function removeStyle(id: number) {
    'use server'
    await StyleModel.destroy({ where: { id } })
    revalidatePath('/admin/styles')
}

//для модального окна для исключения дубликатов
export async function searchStylesByName(name: string) {
    try {
        const styles = await StyleModel.findAll({
            where: {
                name: {
                    [Op.like]: `%${name.toLowerCase()}%`
                },
                //todo раскомментировать после добавлления функционала как для collections
                // isDeleted: false // Исключаем "мягко" удаленные записи
            },
            attributes: [ 'id', 'name', 'isActive' ],
            limit: 10,
            order: [ [ 'name', 'ASC' ] ]
        })
        console.log('Результаты поиска стилей:', styles.map(c => c.toJSON()))

        return styles.map((style) => style.toJSON()) as DictionaryItem[]
    } catch (error) {
        console.error('Ошибка при поиске стилей по названию:', error)
        return []
    }
}

// ------------------- Функции для Категорий -------------------

export async function getAllCategories(): Promise<DictionaryItem[]> {
    try {
        const categories = await CategoryModel.findAll({
            attributes: ['id', 'name'],
            order: [['name', 'ASC']]
        })
        // findAll без raw:true возвращает экземпляры моделей, у которых есть метод toJSON(), а при использовании raw:true - простые объекты у которых нет метода toJSON()
        return categories.map((category) => category.toJSON()) as DictionaryItem[]
    } catch (error) {
        console.error('Ошибка при получении списка активных категорий:', error)
        throw new Error('Не удалось получить список активных категорий.')
    }
}

export async function getCategoryByProductid(id): Promise<DictionaryItem | null> {
    try {
        const category = await CategoryModel.findOne({
            where: {
                productid: id
            }
        })
        if (!category) {
            throw new Error('Категория для данного продукта не определена')
        }
        console.log('++++++++++++++++++++++++ category from :', category.toJSON())
        return category.toJSON()
    } catch (error) {
        console.error('Не удалось получить категорию для данного продукта.')
    }
}

// ------------------- Функции для Цветов и Материалов -------------------
// Новая функция для получения всех активных цветов
export async function getActiveColors() {
    const colors = await ColorModel.findAll({
        where: { isActive: true },
        attributes: ['id', 'name', 'code'],
        order: [['name', 'ASC']]
    })
    return colors.map((color) => color.toJSON()) as DictionaryItem[]
}

// НОВАЯ ФУНКЦИЯ: для получения всех активных материалов
export async function getActiveMaterials() {
    const materials = await MaterialModel.findAll({
        where: { isActive: true },
        attributes: ['id', 'name'],
        order: [['name', 'ASC']]
    })
    return materials.map((material) => material.toJSON()) as DictionaryItem[]
}
