import { sequelize } from '@/db/connection'
import { seedCategories } from '@/db/seeders/category.seeder'
import { seedProducts } from '@/db/seeders/product.seeder'
import { seedColors } from '@/db/seeders/color.seeder'
import { seedUsers } from '@/db/seeders/user.seeder'
import { seedAddresses } from './address.seeder'
import { seedProductVariants } from '@/db/seeders/product_variant.seeder'
import { seedStyles } from '@/db/seeders/style.seeder'
import { seedBrands } from '@/db/seeders/brand.seeder'
import { seedCollections } from '@/db/seeders/collection.seeder'
import { seedMaterials } from '@/db/seeders/material.seeder'
import { seedCountries } from '@/db/seeders/country.seeder'

async function runSeeders() {
    try {
        // Синхронизация базы данных
        // await sequelize.sync({ alter: true }) // force: true пересоздаст таблицы

        // Отключаем проверку внешних ключей перед запуском сидеров
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')

        // Очищаем таблицы перед заполнением
        console.log('Truncating tables...')
        await sequelize.query('TRUNCATE colors')
        await sequelize.query('TRUNCATE categories')
        await sequelize.query('TRUNCATE products')
        await sequelize.query('TRUNCATE styles') // Очищаем таблицу стилей
        await sequelize.query('TRUNCATE brands') // Очищаем таблицу брендов
        await sequelize.query('TRUNCATE collections') // Очищаем таблицу коллекций
        await sequelize.query('TRUNCATE countries') // Очищаем таблицу стран
        await sequelize.query('TRUNCATE materials') // Очищаем таблицу материалов
        await sequelize.query('TRUNCATE product_variants') // Очищаем таблицу вариантов
        await sequelize.query('TRUNCATE images') // Очищаем таблицу images
        // await sequelize.query('TRUNCATE addresses');
        // await sequelize.query('TRUNCATE users');

        // Запуск сидеров в правильном порядке
        console.log('Starting seeders...')
        await seedStyles() // Таблица стилей (на нее ссылаются продукты)
        await seedBrands() // Таблица брендов (на нее ссылаются продукты)
        await seedCollections() // Таблица коллекций (на нее ссылаются продукты)
        await seedCountries() // Таблица стран (на нее ссылаются продукты)
        await seedCategories() // Таблица категорий (на нее ссылаются продукты)
        await seedColors() // Таблица цветов (на них ссылаются варианты продуктов)
        await seedMaterials() // Таблица материалов (может использоваться вариантами продуктов)
        await seedProducts() // Таблица продуктов (ссылается на стили, бренды, коллекции, страны, категории)
        await seedProductVariants() // Таблица вариантов продуктов (ссылается на продукты и цвета)
        // await seedUsers() // Таблица пользователей (не имеет прямых зависимостей от основных таблиц продуктов)
        // await seedAddresses() // Таблица адресов (не имеет прямых зависимостей от основных таблиц продуктов)
        // Закомментированные сидеры
        // await seedAddresses()
        // await seedUsers()

        // Включаем проверку внешних ключей обратно
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1')

        console.log('All seeds completed successfully')
        process.exit(0)
    } catch (error) {
        // В случае ошибки убедимся, что внешние ключи включены обратно
        try {
            await sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
        } catch (e) {
            console.error('Failed to re-enable foreign key checks:', e)
        }

        console.error('Error running seeds:', error)
        process.exit(1)
    }
}

runSeeders()
