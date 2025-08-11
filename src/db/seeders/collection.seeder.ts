import { CollectionModel } from '@/db/models/collection.model'

const collectionSeedData = [
    {
        id: 1, // Можно указать ID явно или позволить автоинкременту
        name: 'Весна 2025',
        description: 'Новая весенняя коллекция мебели',
        isActive: true,
    },
    {
        id: 2,
        name: 'Лето 2025',
        description: 'Яркая летняя коллекция для сада и дома',
        isActive: true,
    },
    {
        id: 3,
        name: 'Осень 2025',
        description: 'Уютная осенняя коллекция в теплых тонах',
        isActive: true,
    },
    {
        id: 4,
        name: 'Зима 2025',
        description: 'Зимняя коллекция для создания атмосферы тепла',
        isActive: true,
    },
    {
        id: 5,
        name: 'Классика',
        description: 'Постоянная коллекция в классическом стиле',
        isActive: true,
    },
    // Добавьте другие коллекции по мере необходимости
]

export async function seedCollections() {
    try {
        await CollectionModel.bulkCreate(collectionSeedData, { ignoreDuplicates: true }) // Добавлена опция ignoreDuplicates
        console.log('Collections seeded successfully')
    } catch (error) {
        console.error('Error seeding collections:', error)
    }
}