import { ProductModel } from '@/db/models/product.model'

const productSeedData = [
    {
        id: 101,
        isActive: true,
        isNew: true,
        articul: 'ART001',
        sku: 'SKU001',
        name: 'Product 101',
        description_1: 'Description 1 for Product 1',
        description_2: 'Description 2 for Product 1',
        length: 100,
        width: 50,
        height: 30,
        weight: 2000,
        box_length: 110,
        box_height: 40,
        box_weight: 2200,
        image: '/kofeinii-stolik-elite.webp',
        old_price: 999.99,
        new_price: 799.99,
        primary_color: 1,
        secondary_color: 2
    },
    {
        id: 102,
        isActive: true,
        isNew: false,
        articul: 'ART002',
        sku: 'SKU002',
        name: 'Product 102',
        description_1: 'Description 1 for Product 2',
        description_2: 'Description 2 for Product 2',
        length: 120,
        width: 60,
        height: 40,
        weight: 2500,
        box_length: 130,
        box_height: 50,
        box_weight: 2700,
        image: '/modulnyj-divan.jpg',
        old_price: 1299.99,
        new_price: 1099.99,
        primary_color: 3,
        secondary_color: 4
    },
    {
        id: 103,
        isActive: true,
        isNew: true,
        articul: 'ART001',
        sku: 'SKU001',
        name: 'Product 103',
        description_1: 'Description 1 for Product 1',
        description_2: 'Description 2 for Product 1',
        length: 100,
        width: 50,
        height: 30,
        weight: 2000,
        box_length: 110,
        box_height: 40,
        box_weight: 2200,
        image: '/kofeinii-stolik-elite.webp',
        old_price: 999.99,
        new_price: 799.99,
        primary_color: 1,
        secondary_color: 2
    },
    {
        id: 104,
        isActive: true,
        isNew: false,
        articul: 'ART002',
        sku: 'SKU002',
        name: 'Product 104',
        description_1: 'Description 1 for Product 2',
        description_2: 'Description 2 for Product 2',
        length: 120,
        width: 60,
        height: 40,
        weight: 2500,
        box_length: 130,
        box_height: 50,
        box_weight: 2700,
        image: '/modulnyj-divan.jpg',
        old_price: 1299.99,
        new_price: 1099.99,
        primary_color: 3,
        secondary_color: 4
    },
    {
        id: 105,
        isActive: true,
        isNew: true,
        articul: 'ART001',
        sku: 'SKU001',
        name: 'Product 105',
        description_1: 'Description 1 for Product 1',
        description_2: 'Description 2 for Product 1',
        length: 100,
        width: 50,
        height: 30,
        weight: 2000,
        box_length: 110,
        box_height: 40,
        box_weight: 2200,
        image: '/kofeinii-stolik-elite.webp',
        old_price: 999.99,
        new_price: 799.99,
        primary_color: 1,
        secondary_color: 2
    },
    {
        id: 106,
        isActive: true,
        isNew: false,
        articul: 'ART002',
        sku: 'SKU002',
        name: 'Product 106',
        description_1: 'Description 1 for Product 2',
        description_2: 'Description 2 for Product 2',
        length: 120,
        width: 60,
        height: 40,
        weight: 2500,
        box_length: 130,
        box_height: 50,
        box_weight: 2700,
        image: '/modulnyj-divan.jpg',
        old_price: 1299.99,
        new_price: 1099.99,
        primary_color: 3,
        secondary_color: 4
    },
    {
        id: 107,
        isActive: true,
        isNew: true,
        articul: 'ART001',
        sku: 'SKU001',
        name: 'Product 107',
        description_1: 'Description 1 for Product 1',
        description_2: 'Description 2 for Product 1',
        length: 100,
        width: 50,
        height: 30,
        weight: 2000,
        box_length: 110,
        box_height: 40,
        box_weight: 2200,
        image: '/kofeinii-stolik-elite.webp',
        old_price: 999.99,
        new_price: 799.99,
        primary_color: 1,
        secondary_color: 2
    },
    {
        id: 108,
        isActive: true,
        isNew: false,
        articul: 'ART002',
        sku: 'SKU002',
        name: 'Product 108',
        description_1: 'Description 1 for Product 2',
        description_2: 'Description 2 for Product 2',
        length: 120,
        width: 60,
        height: 40,
        weight: 2500,
        box_length: 130,
        box_height: 50,
        box_weight: 2700,
        image: '/modulnyj-divan.jpg',
        old_price: 1299.99,
        new_price: 1099.99,
        primary_color: 3,
        secondary_color: 4
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
