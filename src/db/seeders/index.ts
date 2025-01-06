import { sequelize } from '@/db/connection'
import { seedProducts } from '@/db/seeders/product.seeder'
import { seedColors } from '@/db/seeders/color.seeder'
import { seedUsers } from '@/db/seeders/user.seeder'
import { seedAddresses } from './address.seeder'


async function runSeeders() {
  try {
    // Синхронизация базы данных
    await sequelize.sync({ alter: true }) // force: true пересоздаст таблицы

    // Запуск сидеров
    await Promise.all([
      seedColors(),
      seedProducts(),
      seedAddresses(),
      seedUsers()
    ])

    console.log('All seeds completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('Error running seeds:', error)
    process.exit(1)
  }
}

runSeeders()
