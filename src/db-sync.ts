import { User } from '@/db/user.model'
import { Post } from '@/db/post.model'
import { sequelize } from '@/db/connection'
import { Alert } from '@/db/alert.model.ts'

const registeredModels = [ User, Post, Alert ]
const runDbSync = async () => {
    console.log('Syncing DB schema for: ', registeredModels.map(m => m.name).join(', '))
    await sequelize.sync({ alter: true })
    console.log('...done syncing DB schema')
}
runDbSync()
