import {ColorModel} from '@/db/models/color.model'

export async function seedColors() {
    try {
        console.log('Starting color seeding...');
        // Очистка таблицы цветов перед заполнением (опционально, но рекомендуется для сидеров)
        await ColorModel.destroy({ truncate: true, cascade: true });
        console.log('Color table truncated.');

        const colors = [
            {
                isActive: true,
                code: '#FF0000',
                name: 'Красный'
            },
            {
                isActive: true,
                code: '#00FF00',
                name: 'Зеленый'
            },
            {
                isActive: true,
                code: '#0000FF',
                name: 'Синий'
            },
            {
                isActive: true,
                code: '#FFFF00',
                name: 'Желтый'
            },
            {
                isActive: true,
                code: '#FF00FF',
                name: 'Фуксия'
            },
            {
                isActive: false, // Неактивный цвет
                code: '#000000',
                name: 'Черный'
            },
            {
                isActive: true,
                code: '#FFFFFF',
                name: 'Белый'
            },
            {
                isActive: true,
                code: '#808080',
                name: 'Серый'
            },
            {
                isActive: true,
                code: '#FFA500',
                name: 'Оранжевый'
            },
            {
                isActive: true,
                code: '#800080',
                name: 'Фиолетовый'
            },
        ];

        // Используем bulkCreate для более эффективного добавления нескольких записей
        await ColorModel.bulkCreate(colors);

        console.log('Colors seeded successfully');
    } catch (error) {
        console.error('Error seeding colors:', error);
        throw error;
    }
}

// Если нужно запустить сидер отдельно
if (require.main === module) {
    seedColors()
        .then(() => {
            console.log('Seeding completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Seeding failed:', error);
            process.exit(1);
        });
}