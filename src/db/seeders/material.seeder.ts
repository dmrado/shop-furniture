// material.seeder.ts
import { MaterialModel } from '@/db/models/material.model';

const materialSeedData = [
    {
        id: 1, // Можно указать ID явно или позволить автоинкременту
        code: 'WOOD-OAK',
        name: 'Дуб',
        isActive: true,
    },
    {
        id: 2,
        code: 'METAL-STL',
        name: 'Сталь',
        isActive: true,
    },
    {
        id: 3,
        code: 'TEXT-COT',
        name: 'Хлопок',
        isActive: true,
    },
    {
        id: 4,
        code: 'PLAST-ABS',
        name: 'ABS-пластик',
        isActive: true,
    },
    {
        id: 5,
        code: 'GLASS-TMP',
        name: 'Закаленное стекло',
        isActive: true,
    },
    // Добавьте другие материалы по мере необходимости
];

export async function seedMaterials() {
    try {
        await MaterialModel.bulkCreate(materialSeedData, { ignoreDuplicates: true }); // Добавлена опция ignoreDuplicates
        console.log('Materials seeded successfully');
    } catch (error) {
        console.error('Error seeding materials:', error);
    }
}