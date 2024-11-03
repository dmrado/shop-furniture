import { up } from '@/db/seeders/user.seeder'
import { sequelize } from '@/db/connection.ts'

up(sequelize.getQueryInterface())