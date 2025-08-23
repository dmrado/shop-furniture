import { BrandModel } from '@/db/models/brand.model'

const brandSeedData = [
    {
        id: 1, // Можно указать ID явно или позволить автоинкременту
        name: 'Икеа',
        description: 'Шведский производитель мебели и товаров для дома',
        isActive: true,
        isDeleted: false
    },
    {
        id: 2,
        name: 'H&M Home',
        description: 'Подразделение H&M, предлагающее товары для дома',
        isActive: true,
        isDeleted: false
    },
    {
        id: 3,
        name: 'Zara Home',
        description: 'Бренд товаров для дома от Zara',
        isActive: true,
        isDeleted: false
    },
    {
        id: 4,
        name: 'La Redoute Intérieurs',
        description: 'Собственный бренд товаров для дома от La Redoute',
        isActive: true,
        isDeleted: false
    },
    {
        id: 5,
        name: 'JYSK',
        description: 'Датский розничный торговец товарами для дома',
        isActive: true,
        isDeleted: false
    }
    // Добавьте другие бренды по мере необходимости
]

export async function seedBrands() {
    try {
        await BrandModel.bulkCreate(brandSeedData, { ignoreDuplicates: true }) // Добавлена опция ignoreDuplicates
        console.log('Brands seeded successfully')
    } catch (error) {
        console.error('Error seeding brands:', error)
    }
}
