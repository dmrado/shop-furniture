import { ProfileModel } from '@/db/models/profile.model'
// import { AuthUserModel } from '@/db/models'

export const seedUsers = async (): Promise<void> => {
    // todo: first create 1-2 users, then a couple of profiles
    try {
        const users = [
            {
                email: 'john.doe@example.com',
                name: 'John',
                surName: 'Doe',
                fatherName: 'Michael',
                canContact: true,
                isActive: true
            },
            {
                email: 'jane.smith@example.com',
                name: 'Jane',
                surName: 'Smith',
                fatherName: 'William',
                canContact: false,
                isActive: true
            },
            {
                email: 'bob.johnson@example.com',
                name: 'Bob',
                surName: 'Johnson',
                fatherName: 'James',
                canContact: true,
                isActive: false
            }
        ]

        await ProfileModel.destroy({ where: {} })
        await ProfileModel.bulkCreate(users)

        console.log('Users seeded successfully')
    } catch (error) {
        console.error('Error seeding users:', error)
        throw error
    }
}
