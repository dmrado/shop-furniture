import { sequelize } from '../connection'
import { seedProducts } from './product.seeder'

async function runSeeders() {
  try {
    // Синхронизация базы данных
    await sequelize.sync({ alter: true }) // force: true пересоздаст таблицы

    // Запуск сидеров
    await seedProducts()

    console.log('All seeds completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('Error running seeds:', error)
    process.exit(1)
  }
}

runSeeders()
