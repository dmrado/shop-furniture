import { ColorModel } from '@/db/models/color.model'

export async function seedColors() {
  try {
    const colors = [
      {
        isActive: true,
        colorCode: '#FF0000'
      },
      {
        isActive: true,
        colorCode: '#00FF00'
      },
      {
        isActive: true,
        colorCode: '#0000FF'
      },
      {
        isActive: true,
        colorCode: '#FFFF00'
      },
      {
        isActive: true,
        colorCode: '#FF00FF'
      },
      {
        isActive: false,
        colorCode: '#000000'
      },
      {
        isActive: true,
        colorCode: '#FFFFFF'
      },
    ];

    for (const color of colors) {
      await ColorModel.findOrCreate({
        where: { colorCode: color.colorCode },
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
