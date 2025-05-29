import { ProductVariantModel } from '@/db/models/product_variant.model'

const productVariantSeedData = [
    {
        productId: 101, // Замените на реальный ID продукта
        colorId: 1, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART001-1',
        length: 100,
        width: 50,
        height: 30,
        weight: 2000,
        box_length: 110,
        box_height: 40,
        box_weight: 2200,
        price: 799.99,
    },
    {
        productId: 101, // Замените на реальный ID продукта
        colorId: 2, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART001-2',
        length: 105,
        width: 55,
        height: 35,
        weight: 2100,
        box_length: 115,
        box_height: 45,
        box_weight: 2300,
        price: 849.99,
    },
    {
        productId: 102, // Замените на реальный ID продукта
        colorId: 3, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART002-1',
        length: 120,
        width: 60,
        height: 40,
        weight: 2500,
        box_length: 130,
        box_height: 50,
        box_weight: 2700,
        price: 1099.99,
    },
    {
        productId: 102, // Замените на реальный ID продукта
        colorId: 4, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART002-2',
        length: 125,
        width: 65,
        height: 45,
        weight: 2600,
        box_length: 135,
        box_height: 55,
        box_weight: 2800,
        price: 1149.99,
    },
    {
        productId: 103, // Замените на реальный ID продукта
        colorId: 1, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART001-1',
        length: 100,
        width: 50,
        height: 30,
        weight: 2000,
        box_length: 110,
        box_height: 40,
        box_weight: 2200,
        price: 799.99,
    },
    {
        productId: 104, // Замените на реальный ID продукта
        colorId: 3, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART002-1',
        length: 120,
        width: 60,
        height: 40,
        weight: 2500,
        box_length: 130,
        box_height: 50,
        box_weight: 2700,
        price: 1099.99,
    },
    {
        productId: 105, // Замените на реальный ID продукта
        colorId: 2, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART001-2',
        length: 105,
        width: 55,
        height: 35,
        weight: 2100,
        box_length: 115,
        box_height: 45,
        box_weight: 2300,
        price: 849.99,
    },
    {
        productId: 106, // Замените на реальный ID продукта
        colorId: 4, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART002-2',
        length: 125,
        width: 65,
        height: 45,
        weight: 2600,
        box_length: 135,
        box_height: 55,
        box_weight: 2800,
        price: 1149.99,
    },
    {
        productId: 107, // Замените на реальный ID продукта
        colorId: 1, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART001-1',
        length: 100,
        width: 50,
        height: 30,
        weight: 2000,
        box_length: 110,
        box_height: 40,
        box_weight: 2200,
        price: 799.99,
    },
    {
        productId: 108, // Замените на реальный ID продукта
        colorId: 3, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART002-1',
        length: 120,
        width: 60,
        height: 40,
        weight: 2500,
        box_length: 130,
        box_height: 50,
        box_weight: 2700,
        price: 1099.99,
    },
    {
        productId: 11, // Замените на реальный ID продукта
        colorId: 2, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART001-2',
        length: 105,
        width: 55,
        height: 35,
        weight: 2100,
        box_length: 115,
        box_height: 45,
        box_weight: 2300,
        price: 849.99,
    },
    {
        productId: 12, // Замените на реальный ID продукта
        colorId: 4, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART002-2',
        length: 125,
        width: 65,
        height: 45,
        weight: 2600,
        box_length: 135,
        box_height: 55,
        box_weight: 2800,
        price: 1149.99,
    },
    {
        productId: 13, // Замените на реальный ID продукта
        colorId: 1, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART001-1',
        length: 100,
        width: 50,
        height: 30,
        weight: 2000,
        box_length: 110,
        box_height: 40,
        box_weight: 2200,
        price: 799.99,
    },
    {
        productId: 14, // Замените на реальный ID продукта
        colorId: 3, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART002-1',
        length: 120,
        width: 60,
        height: 40,
        weight: 2500,
        box_length: 130,
        box_height: 50,
        box_weight: 2700,
        price: 1099.99,
    },
    {
        productId: 15, // Замените на реальный ID продукта
        colorId: 2, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART001-2',
        length: 105,
        width: 55,
        height: 35,
        weight: 2100,
        box_length: 115,
        box_height: 45,
        box_weight: 2300,
        price: 849.99,
    },
    {
        productId: 16, // Замените на реальный ID продукта
        colorId: 4, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART002-2',
        length: 125,
        width: 65,
        height: 45,
        weight: 2600,
        box_length: 135,
        box_height: 55,
        box_weight: 2800,
        price: 1149.99,
    },
    {
        productId: 17, // Замените на реальный ID продукта
        colorId: 1, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART001-1',
        length: 100,
        width: 50,
        height: 30,
        weight: 2000,
        box_length: 110,
        box_height: 40,
        box_weight: 2200,
        price: 799.99,
    },
    {
        productId: 18, // Замените на реальный ID продукта
        colorId: 3, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART002-1',
        length: 120,
        width: 60,
        height: 40,
        weight: 2500,
        box_length: 130,
        box_height: 50,
        box_weight: 2700,
        price: 1099.99,
    },
    {
        productId: 1, // Замените на реальный ID продукта
        colorId: 2, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART001-2',
        length: 105,
        width: 55,
        height: 35,
        weight: 2100,
        box_length: 115,
        box_height: 45,
        box_weight: 2300,
        price: 849.99,
    },
    {
        productId: 2, // Замените на реальный ID продукта
        colorId: 4, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART002-2',
        length: 125,
        width: 65,
        height: 45,
        weight: 2600,
        box_length: 135,
        box_height: 55,
        box_weight: 2800,
        price: 1149.99,
    },
    {
        productId: 3, // Замените на реальный ID продукта
        colorId: 1, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART001-1',
        length: 100,
        width: 50,
        height: 30,
        weight: 2000,
        box_length: 110,
        box_height: 40,
        box_weight: 2200,
        price: 799.99,
    },
    {
        productId: 4, // Замените на реальный ID продукта
        colorId: 3, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART002-1',
        length: 120,
        width: 60,
        height: 40,
        weight: 2500,
        box_length: 130,
        box_height: 50,
        box_weight: 2700,
        price: 1099.99,
    },
    {
        productId: 5, // Замените на реальный ID продукта
        colorId: 2, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART001-2',
        length: 105,
        width: 55,
        height: 35,
        weight: 2100,
        box_length: 115,
        box_height: 45,
        box_weight: 2300,
        price: 849.99,
    },
    {
        productId: 6, // Замените на реальный ID продукта
        colorId: 4, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART002-2',
        length: 125,
        width: 65,
        height: 45,
        weight: 2600,
        box_length: 135,
        box_height: 55,
        box_weight: 2800,
        price: 1149.99,
    },
    {
        productId: 7, // Замените на реальный ID продукта
        colorId: 1, // Замените на реальный ID цвета
        isActive: true,
        articul: 'ART001-1',
        length: 100,
        width: 50,
        height: 30,
        weight: 2000,
        box_length: 110,
        box_height: 40,
        box_weight: 2200,
        price: 799.99,
    },
    {
        productId: 8,
        colorId: 3,
        isActive: true,
        articul: 'ART002-1',
        length: 120,
        width: 60,
        height: 40,
        weight: 2500,
        box_length: 130,
        box_height: 50,
        box_weight: 2700,
        price: 1099.99,
    },
    {
        productId: 9,
        colorId: 2,
        isActive: true,
        articul: 'ART001-2',
        length: 105,
        width: 55,
        height: 35,
        weight: 2100,
        box_length: 115,
        box_height: 45,
        box_weight: 2300,
        price: 849.99,
    },
    {
        productId: 10,
        colorId: 4,
        isActive: true,
        articul: 'ART002-2',
        length: 125,
        width: 65,
        height: 45,
        weight: 2600,
        box_length: 135,
        box_height: 55,
        box_weight: 2800,
        price: 1149.99,
    },
    {
        productId: 19,
        colorId: 1,
        isActive: true,
        articul: 'ART001-1',
        length: 100,
        width: 50,
        height: 30,
        weight: 2000,
        box_length: 110,
        box_height: 40,
        box_weight: 2000,
        price: 1149.99,
    }
]

export async function seedProductVariants() {
    try {
        await ProductVariantModel.bulkCreate(productVariantSeedData)
        console.log('Products seeded successfully')
    } catch (error) {
        console.error('Error seeding products variants:', error)
    }
}
