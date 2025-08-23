// db/seeders/product_variant.seeder.ts (или ваш соответствующий файл сидов)
import { ProductVariantModel } from '@/db/models/product_variant.model'

const productVariantSeedData = [
    // Вариант 1 (Product 101, Color 1, Material 1)
    {
        productId: 101,
        colorId: 1,
        materialId: 1,
        isActive: true,
        articul: 'PV101-001-001',
        length: 75,
        width: 40,
        height: 25,
        weight: 1500,
        box_length: 85,
        box_width: 50,
        box_height: 35,
        box_weight: 1700,
        quantity: 50,
        price: 499.99
    },
    // Вариант 2 (Product 101, Color 2, Material 1)
    {
        productId: 101,
        colorId: 2,
        materialId: 1,
        isActive: true,
        articul: 'PV101-002-001',
        length: 78,
        width: 42,
        height: 27,
        weight: 1600,
        box_length: 88,
        box_width: 52,
        box_height: 37,
        box_weight: 1800,
        quantity: 30,
        price: 549.99
    },
    // Вариант 3 (Product 102, Color 1, Material 2)
    {
        productId: 102,
        colorId: 1,
        materialId: 2,
        isActive: true,
        articul: 'PV102-001-002',
        length: 120,
        width: 60,
        height: 40,
        weight: 2500,
        box_length: 130,
        box_width: 70,
        box_height: 50,
        box_weight: 2700,
        quantity: 20,
        price: 999.0
    },
    // Вариант 4 (Product 102, Color 2, Material 2)
    {
        productId: 102,
        colorId: 2,
        materialId: 2,
        isActive: true,
        articul: 'PV102-002-002',
        length: 125,
        width: 65,
        height: 45,
        weight: 2600,
        box_length: 135,
        box_width: 75,
        box_height: 55,
        box_weight: 2800,
        quantity: 15,
        price: 1049.0
    },
    // Вариант 5 (Product 103, Color 3, Material 3) - Неактивный
    {
        productId: 103,
        colorId: 3,
        materialId: 3,
        isActive: false,
        articul: 'PV103-003-003',
        length: 90,
        width: 50,
        height: 30,
        weight: 1800,
        box_length: 100,
        box_width: 60,
        box_height: 40,
        box_weight: 2000,
        quantity: 40,
        price: 650.5
    },
    // Вариант 6 (Product 103, Color 4, Material 3)
    {
        productId: 103,
        colorId: 4,
        materialId: 3,
        isActive: true,
        articul: 'PV103-004-003',
        length: 92,
        width: 52,
        height: 32,
        weight: 1900,
        box_length: 102,
        box_width: 62,
        box_height: 42,
        box_weight: 2100,
        quantity: 25,
        price: 699.5
    },
    // Вариант 7 (Product 104, Color 1, Material 4)
    {
        productId: 104,
        colorId: 1,
        materialId: 4,
        isActive: true,
        articul: 'PV104-001-004',
        length: 150,
        width: 70,
        height: 50,
        weight: 3500,
        box_length: 160,
        box_width: 80,
        box_height: 60,
        box_weight: 3800,
        quantity: 10,
        price: 1500.0
    },
    // Вариант 8 (Product 104, Color 2, Material 4)
    {
        productId: 104,
        colorId: 2,
        materialId: 4,
        isActive: true,
        articul: 'PV104-002-004',
        length: 155,
        width: 75,
        height: 55,
        weight: 3600,
        box_length: 165,
        box_width: 85,
        box_height: 65,
        box_weight: 3900,
        quantity: 8,
        price: 1550.0
    },
    // Вариант 9 (Product 105, Color 3, Material 5)
    {
        productId: 105,
        colorId: 3,
        materialId: 5,
        isActive: true,
        articul: 'PV105-003-005',
        length: 110,
        width: 55,
        height: 35,
        weight: 2200,
        box_length: 120,
        box_width: 65,
        box_height: 45,
        box_weight: 2400,
        quantity: 35,
        price: 750.75
    },
    // Вариант 10 (Product 105, Color 4, Material 5)
    {
        productId: 105,
        colorId: 4,
        materialId: 5,
        isActive: true,
        articul: 'PV105-004-005',
        length: 112,
        width: 57,
        height: 37,
        weight: 2300,
        box_length: 122,
        box_width: 67,
        box_height: 47,
        box_weight: 2500,
        quantity: 28,
        price: 780.75
    },

    // Генерация дополнительных 50 вариантов (всего 60)
    ...Array.from({ length: 50 }).map((_, i) => {
        // Начинаем productId со 101 и идем до 120 (101 + 20 - 1 = 120)
        const productId = (i % 40) + 101
        const colorId = (i % 4) + 1 // Цвета от 1 до 4
        const materialId = (i % 5) + 1 // Материалы от 1 до 5
        const baseArticul = `PV${String(productId).padStart(3, '0')}-${String(colorId).padStart(3, '0')}-${String(materialId).padStart(3, '0')}`
        const suffix = String(i + 11).padStart(2, '0')

        return {
            productId,
            colorId,
            materialId,
            isActive: Math.random() > 0.1, // 90% активных
            articul: `${baseArticul}-${suffix}`,
            length: Math.floor(Math.random() * (150 - 50 + 1)) + 50,
            width: Math.floor(Math.random() * (80 - 30 + 1)) + 30,
            height: Math.floor(Math.random() * (60 - 20 + 1)) + 20,
            weight: Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000,
            box_length: Math.floor(Math.random() * (160 - 60 + 1)) + 60,
            box_width: Math.floor(Math.random() * (90 - 40 + 1)) + 40,
            box_height: Math.floor(Math.random() * (70 - 30 + 1)) + 30,
            box_weight: Math.floor(Math.random() * (4500 - 1200 + 1)) + 1200,
            quantity: Math.floor(Math.random() * 100) + 1,
            price: parseFloat((Math.random() * (2000 - 200) + 200).toFixed(2))
        }
    })
]

export async function seedProductVariants() {
    try {
        console.log('Starting product_variants seeding...')
        await ProductVariantModel.destroy({ truncate: true, cascade: true })
        console.log('product_variants table truncated.')

        await ProductVariantModel.bulkCreate(productVariantSeedData)
        console.log(
            `product_variants seeded successfully. Total ${productVariantSeedData.length} variants created.`
        )
    } catch (error) {
        console.error('Error seeding product_variants:', error)
    }
}
