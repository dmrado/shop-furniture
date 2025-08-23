import { StyleModel } from '@/db/models/style.model'

const styleSeedData = [
    {
        id: 1, // Можно указать ID явно или позволить автоинкременту
        name: 'Классический',
        description: 'Традиционный и элегантный стиль',
        isActive: true
    },
    {
        id: 2,
        name: 'Современный',
        description: 'Минималистичный и функциональный стиль',
        isActive: true
    },
    {
        id: 3,
        name: 'Лофт',
        description: 'Индустриальный и урбанистический стиль',
        isActive: true
    },
    {
        id: 4,
        name: 'Скандинавский',
        description: 'Светлый, уютный и натуральный стиль',
        isActive: true
    },
    {
        id: 5,
        name: 'Прованс',
        description: 'Романтичный и деревенский стиль',
        isActive: true
    }
    // Добавьте другие стили по мере необходимости
]

export async function seedStyles() {
    try {
        await StyleModel.bulkCreate(styleSeedData, { ignoreDuplicates: true }) // Добавлена опция ignoreDuplicates
        console.log('Styles seeded successfully')
    } catch (error) {
        console.error('Error seeding styles:', error)
    }
}
