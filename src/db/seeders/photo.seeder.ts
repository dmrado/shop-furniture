// photo.seeder.ts
import { PhotoModel } from '@/db/models/photo.model';

const photoSeedData = [
    {
        productId: 101, // Замените на существующий ID продукта
        productVariantId: null, // Или замените на существующий ID варианта продукта, если применимо
        photoPath: '/images/product-101-main.jpg',
    },
    {
        productId: 101,
        productVariantId: 1, // Замените на существующий ID варианта продукта
        photoPath: '/images/product-101-variant-1.jpg',
    },
    {
        productId: 102,
        productVariantId: null,
        photoPath: '/images/product-102-main.jpg',
    },
    {
        productId: 102,
        productVariantId: 3, // Замените на существующий ID варианта продукта
        photoPath: '/images/product-102-variant-1.jpg',
    },
    {
        productId: null,
        productVariantId: 2, // Замените на существующий ID варианта продукта
        photoPath: '/images/variant-2-photo-1.jpg',
    },
    {
        productId: null,
        productVariantId: 4, // Замените на существующий ID варианта продукта
        photoPath: '/images/variant-4-photo-1.jpg',
    },
    // Добавьте другие фотографии по мере необходимости
];

export async function seedPhotos() {
    try {
        await PhotoModel.bulkCreate(photoSeedData, { ignoreDuplicates: true });
        console.log('Photos seeded successfully');
    } catch (error) {
        console.error('Error seeding photos:', error);
    }
}