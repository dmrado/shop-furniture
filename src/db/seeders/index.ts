import { sequelize } from '@/db/connection'
import { seedProducts } from '@/db/seeders/product.seeder'
import { seedColors } from '@/db/seeders/color.seeder'
import { seedUsers } from '@/db/seeders/user.seeder'
import { seedAddresses } from './address.seeder'
import { seedCategories } from '@/db/seeders/category.seeder'
import { seedTags } from '@/db/seeders/tag.seeder'

async function runSeeders() {
    try {
        // Синхронизация базы данных
        await sequelize.sync({ alter: true }) // force: true пересоздаст таблицы

        // Отключаем проверку внешних ключей перед запуском сидеров
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        // Очищаем таблицы перед заполнением
        console.log('Truncating tables...');
        await sequelize.query('TRUNCATE colors');
        await sequelize.query('TRUNCATE categories');
        await sequelize.query('TRUNCATE products');
        // Добавьте другие таблицы, которые нужно очистить
        // await sequelize.query('TRUNCATE addresses');
        // await sequelize.query('TRUNCATE users');

        // Запуск сидеров в правильном порядке
        console.log('Starting seeders...');
        await seedColors()
        await seedCategories() // Сначала заполняем категории
        await seedProducts()   // Затем продукты, которые могут ссылаться на категории
        await seedTags()   // Затем теги, которые могут ссылаться на продукты

        // Закомментированные сидеры
        // await seedAddresses()
        // await seedUsers()

        // Включаем проверку внешних ключей обратно
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

        console.log('All seeds completed successfully')
        process.exit(0)
    } catch (error) {
        // В случае ошибки убедимся, что внешние ключи включены обратно
        try {
            await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        } catch (e) {
            console.error('Failed to re-enable foreign key checks:', e)
        }

        console.error('Error running seeds:', error)
        process.exit(1)
    }
}

runSeeders()

// import { sequelize } from '@/db/connection'
// import { seedProducts } from '@/db/seeders/product.seeder'
// import { seedColors } from '@/db/seeders/color.seeder'
// import { seedUsers } from '@/db/seeders/user.seeder'
// import { seedAddresses } from './address.seeder'
// import {seedCategories} from '@/db/seeders/category.seeder'
//
// async function runSeeders() {
//     try {
//     // Синхронизация базы данных
//         await sequelize.sync({ alter: true }) // force: true пересоздаст таблицы
//
//         // Запуск сидеров
//         await Promise.all([
//             seedColors(),
//             seedProducts(),
//             seedCategories(),
//             // seedAddresses(),
//             // seedUsers()
//         ])
//
//         console.log('All seeds completed successfully')
//         process.exit(0)
//     } catch (error) {
//         console.error('Error running seeds:', error)
//         process.exit(1)
//     }
// }
//
// runSeeders()
