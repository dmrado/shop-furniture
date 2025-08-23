// country.seeder.ts
import { CountryModel } from '@/db/models/country.model'

const countrySeedData = [
    {
        id: 1, // Можно указать ID явно или позволить автоинкременту
        name: 'Россия',
        description: 'Российская Федерация',
        isActive: true
    },
    {
        id: 2,
        name: 'Китай',
        description: 'Китайская Народная Республика',
        isActive: true
    },
    {
        id: 3,
        name: 'Италия',
        description: 'Итальянская Республика',
        isActive: true
    },
    {
        id: 4,
        name: 'Германия',
        description: 'Федеративная Республика Германия',
        isActive: true
    },
    {
        id: 5,
        name: 'США',
        description: 'Соединенные Штаты Америки',
        isActive: true
    }
    // Добавьте другие страны по мере необходимости
]

export async function seedCountries() {
    try {
        await CountryModel.bulkCreate(countrySeedData, {
            ignoreDuplicates: true
        }) // Добавлена опция ignoreDuplicates
        console.log('Countries seeded successfully')
    } catch (error) {
        console.error('Error seeding countries:', error)
    }
}
