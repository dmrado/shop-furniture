import { ProductModel } from '@/db/models/product.model';

const productSeedData = [
    {
        id: 101,
        categoryId: 4,
        styleId: 1, // <---- Добавьте styleId (замените на реальный ID стиля)
        brandId: 1, // <---- Добавьте brandId (замените на реальный ID бренда)
        collectionId: 1, // <---- Добавьте collectionId (замените на реальный ID коллекции)
        countryId: 1, // <---- Добавьте countryId (замените на реальный ID страны)
        isActive: true,
        isNew: true,
        articul: 'ART001',
        sku: 'SKU001',
        name: 'Product 101',
        descriptionShort: 'Description 1 for Product 1',
        descriptionLong: 'Description 2 for Product 1',
        image: '/kofeinii-stolik-elite.webp',
        old_price: 999.99,
        new_price: 799.99,
        primary_color: 1,
        secondary_color: 2
    },
    {
        id: 102,
        categoryId: 4,
        styleId: 2, // <---- Добавьте styleId (замените на реальный ID стиля)
        brandId: 2, // <---- Добавьте brandId (замените на реальный ID бренда)
        collectionId: 2, // <---- Добавьте collectionId (замените на реальный ID коллекции)
        countryId: 2, // <---- Добавьте countryId (замените на реальный ID страны)
        isActive: true,
        isNew: false,
        articul: 'ART002',
        sku: 'SKU002',
        name: 'Product 102',
        descriptionShort: 'Description 1 for Product 2',
        descriptionLong: 'Description 2 for Product 2',
        image: '/modulnyj-divan.jpg',
        old_price: 1299.99,
        new_price: 1099.99,
        primary_color: 3,
        secondary_color: 4
    },
    {
        id: 103,
        categoryId: 4,
        styleId: 1, // <---- Добавьте styleId (замените на реальный ID стиля)
        brandId: 1, // <---- Добавьте brandId (замените на реальный ID бренда)
        collectionId: 1, // <---- Добавьте collectionId (замените на реальный ID коллекции)
        countryId: 1, // <---- Добавьте countryId (замените на реальный ID страны)
        isActive: true,
        isNew: true,
        articul: 'ART001',
        sku: 'SKU001',
        name: 'Product 103',
        descriptionShort: 'Description 1 for Product 1',
        descriptionLong: 'Description 2 for Product 1',
        image: '/kofeinii-stolik-elite.webp',
        old_price: 999.99,
        new_price: 799.99,
        primary_color: 1,
        secondary_color: 2
    },
    {
        id: 104,
        categoryId: 4,
        styleId: 2, // <---- Добавьте styleId (замените на реальный ID стиля)
        brandId: 2, // <---- Добавьте brandId (замените на реальный ID бренда)
        collectionId: 2, // <---- Добавьте collectionId (замените на реальный ID коллекции)
        countryId: 2, // <---- Добавьте countryId (замените на реальный ID страны)
        isActive: true,
        isNew: false,
        articul: 'ART002',
        sku: 'SKU002',
        name: 'Product 104',
        descriptionShort: 'Description 1 for Product 2',
        descriptionLong: 'Description 2 for Product 2',
        image: '/modulnyj-divan.jpg',
        old_price: 1299.99,
        new_price: 1099.99,
        primary_color: 3,
        secondary_color: 4
    },
    {
        id: 105,
        categoryId: 4,
        styleId: 1, // <---- Добавьте styleId (замените на реальный ID стиля)
        brandId: 1, // <---- Добавьте brandId (замените на реальный ID бренда)
        collectionId: 1, // <---- Добавьте collectionId (замените на реальный ID коллекции)
        countryId: 1, // <---- Добавьте countryId (замените на реальный ID страны)
        isActive: true,
        isNew: true,
        articul: 'ART001',
        sku: 'SKU001',
        name: 'Product 105',
        descriptionShort: 'Description 1 for Product 1',
        descriptionLong: 'Description 2 for Product 1',
        image: '/kofeinii-stolik-elite.webp',
        old_price: 999.99,
        new_price: 799.99,
        primary_color: 1,
        secondary_color: 2
    },
    {
        id: 106,
        categoryId: 5,
        styleId: 2, // <---- Добавьте styleId (замените на реальный ID стиля)
        brandId: 2, // <---- Добавьте brandId (замените на реальный ID бренда)
        collectionId: 2, // <---- Добавьте collectionId (замените на реальный ID коллекции)
        countryId: 2, // <---- Добавьте countryId (замените на реальный ID страны)
        isActive: true,
        isNew: false,
        articul: 'ART002',
        sku: 'SKU002',
        name: 'Product 106',
        descriptionShort: 'Description 1 for Product 2',
        descriptionLong: 'Description 2 for Product 2',
        image: '/modulnyj-divan.jpg',
        old_price: 1299.99,
        new_price: 1099.99,
        primary_color: 3,
        secondary_color: 4
    },
    {
        id: 107,
        categoryId: 5,
        styleId: 1, // <---- Добавьте styleId (замените на реальный ID стиля)
        brandId: 1, // <---- Добавьте brandId (замените на реальный ID бренда)
        collectionId: 1, // <---- Добавьте collectionId (замените на реальный ID коллекции)
        countryId: 1, // <---- Добавьте countryId (замените на реальный ID страны)
        isActive: true,
        isNew: true,
        articul: 'ART001',
        sku: 'SKU001',
        name: 'Product 107',
        descriptionShort: 'Description 1 for Product 1',
        descriptionLong: 'Description 2 for Product 1',
        image: '/kofeinii-stolik-elite.webp',
        old_price: 999.99,
        new_price: 799.99,
        primary_color: 1,
        secondary_color: 2
    },
    {
        id: 108,
        categoryId: 5,
        styleId: 2, // <---- Добавьте styleId (замените на реальный ID стиля)
        brandId: 2, // <---- Добавьте brandId (замените на реальный ID бренда)
        collectionId: 2, // <---- Добавьте collectionId (замените на реальный ID коллекции)
        countryId: 2, // <---- Добавьте countryId (замените на реальный ID страны)
        isActive: true,
        isNew: false,
        articul: 'ART002',
        sku: 'SKU002',
        name: 'Product 108',
        descriptionShort: 'Description 1 for Product 2',
        descriptionLong: 'Description 2 for Product 2',
        image: '/modulnyj-divan.jpg',
        old_price: 1299.99,
        new_price: 1099.99,
        primary_color: 3,
        secondary_color: 4
    },
    {
        id: 11,
        categoryId: 5,
        styleId: 1, // <---- Добавьте styleId (замените на реальный ID стиля)
        brandId: 1, // <---- Добавьте brandId (замените на реальный ID бренда)
        collectionId: 1, // <---- Добавьте collectionId (замените на реальный ID коллекции)
        countryId: 1, // <---- Добавьте countryId (замените на реальный ID страны)
        isActive: true,
        isNew: true,
        articul: 'ART001',
        sku: 'SKU001',
        name: 'Product 11',
        descriptionShort: 'Description 1 for Product 1',
        descriptionLong: 'Description 2 for Product 1',
        image: '/kofeinii-stolik-elite.webp',
        old_price: 999.99,
        new_price: 799.99,
        primary_color: 1,
        secondary_color: 2
    },
    {
        id: 12,
        categoryId: 5,
        styleId: 2, // <---- Добавьте styleId (замените на реальный ID стиля)
        brandId: 2, // <---- Добавьте brandId (замените на реальный ID бренда)
        collectionId: 2, // <---- Добавьте collectionId (замените на реальный ID коллекции)
        countryId: 2, // <---- Добавьте countryId (замените на реальный ID страны)
        isActive: true,
        isNew: false,
        articul: 'ART002',
        sku: 'SKU002',
        name: 'Product 12',
        descriptionShort: 'Description 1 for Product 2',
        descriptionLong: 'Description 2 for Product 2',
        image: '/modulnyj-divan.jpg',
        old_price: 1299.99,
        new_price: 1099.99,
        primary_color: 3,
        secondary_color: 4
    },
    {
        id: 13,
        categoryId: 5,
        styleId: 1, // <---- Добавьте styleId (замените на реальный ID стиля)
        brandId: 1, // <---- Добавьте brandId (замените на реальный ID бренда)
        collectionId: 1, // <---- Добавьте collectionId (замените на реальный ID коллекции)
        countryId: 1, // <---- Добавьте countryId (замените на реальный ID страны)
        isActive: true,
        isNew: true,
        articul: 'ART001',
        sku: 'SKU001',
        name: 'Product 13',
        descriptionShort: 'Description 1 for Product 1',
        descriptionLong: 'Description 2 for Product 1',
        image: '/kofeinii-stolik-elite.webp',
        old_price: 999.99,
        new_price: 799.99,
        primary_color: 1,
        secondary_color: 2
    },
    {
        id: 14,
        categoryId: 5,
        styleId: 2, // <---- Добавьте styleId (замените на реальный ID стиля)
        brandId: 2, // <---- Добавьте brandId (замените на реальный ID бренда)
        collectionId: 2, // <---- Добавьте collectionId (замените на реальный ID коллекции)
        countryId: 2, // <---- Добавьте countryId (замените на реальный ID страны)
        isActive: true,
        isNew: false,
        articul: 'ART002',
        sku: 'SKU002',
        name: 'Product 14',
        descriptionShort: 'Description 1 for Product 2',
        descriptionLong: 'Description 2 for Product 2',
        image: '/modulnyj-divan.jpg',
        old_price: 1299.99,
        new_price: 1099.99,
        primary_color: 3,
        secondary_color: 4
    },
    {
        id: 15,
        categoryId: 5,
        styleId: 1, // <---- Добавьте styleId (замените на реальный ID стиля)
        brandId: 1, // <---- Добавьте brandId (замените на реальный ID бренда)
        collectionId: 1, // <---- Добавьте collectionId (замените на реальный ID коллекции)
        countryId: 1, // <---- Добавьте countryId (замените на реальный ID страны)
        isActive: true,
        isNew: true,
        articul: 'ART001',
        sku: 'SKU001',
        name: 'Product 15',
        descriptionShort: 'Description 1 for Product 1',
        descriptionLong: 'Description 2 for Product 1',
        image: '/kofeinii-stolik-elite.webp',
        old_price: 999.99,
        new_price: 799.99,
        primary_color: 1,
        secondary_color: 2
    },
    {
        id: 16,
        categoryId: 12,
        styleId: 2, // <---- Добавьте styleId (замените на реальный ID стиля)
        brandId: 2, // <---- Добавьте brandId (замените на реальный ID бренда)
        collectionId: 2, // <---- Добавьте collectionId (замените на реальный ID коллекции)
        countryId: 2, // <---- Добавьте countryId (замените на реальный ID страны)
        isActive: true,
        isNew: false,
        articul: 'ART002',
        sku: 'SKU002',
        name: 'Product 16',
        descriptionShort: 'Description 1 for Product 2',
        descriptionLong: 'Description 2 for Product 2',
        image: '/modulnyj-divan.jpg',
        old_price: 1299.99,
        new_price: 1099.99,
        primary_color: 3,
        secondary_color: 4
    },
    {
        id: 17,
        categoryId: 12,
        styleId: 1, // <---- Добавьте styleId (замените на реальный ID стиля)
        brandId: 1, // <---- Добавьте brandId (замените на реальный ID бренда)
        collectionId: 1, // <---- Добавьте collectionId (замените на реальный ID коллекции)
        countryId: 1, // <---- Добавьте countryId (замените на реальный ID страны)
        isActive: true,
        isNew: true,
        articul: 'ART001',
        sku: 'SKU001',
        name: 'Product 17',
        descriptionShort: 'Description 1 for Product 1',
        descriptionLong: 'Description 2 for Product 1',
        image: '/kofeinii-stolik-elite.webp',
        old_price: 999.99,
        new_price: 799.99,
        primary_color: 1,
        secondary_color: 2
    },
    {
        id: 18,
        categoryId: 12,
        styleId: 2, // <---- Добавьте styleId (замените на реальный ID стиля)
        brandId: 2, // <---- Добавьте brandId (замените на реальный ID бренда)
        collectionId: 2, // <---- Добавьте collectionId (замените на реальный ID коллекции)
        countryId: 2, // <---- Добавьте countryId (замените на реальный ID страны)
        isActive: true,
        isNew: false,
        articul: 'ART002',
        sku: 'SKU002',
        name: 'Product 18',
        descriptionShort: 'Description 1 for Product 1',
        descriptionLong: 'Description 2 for Product 1',
        image: '/kofeinii-stolik-elite.webp',
        old_price: 999.99,
        new_price: 799.99,
        primary_color: 1,
        secondary_color: 2
    }
]
export async function seedProducts() {
    try {
        await ProductModel.bulkCreate(productSeedData)
        console.log('Products seeded successfully')
    } catch (error) {
        console.error('Error seeding products:', error)
    }
}
