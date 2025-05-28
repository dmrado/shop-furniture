import {ColorModel} from '@/db/models/color.model'

export async function seedColors() {
    try {
        const colors = [
            {
                isActive: true,
                code: '#FF0000'
            },
            {
                isActive: true,
                code: '#00FF00'
            },
            {
                isActive: true,
                code: '#0000FF'
            },
            {
                isActive: true,
                code: '#FFFF00'
            },
            {
                isActive: true,
                code: '#FF00FF'
            },
            {
                isActive: false,
                code: '#000000'
            },
            {
                isActive: true,
                code: '#FFFFFF'
            },
        ];

        for (const color of colors) {
            await ColorModel.findOrCreate({
                where: {code: color.code},
                defaults: color,
            });
        }

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
