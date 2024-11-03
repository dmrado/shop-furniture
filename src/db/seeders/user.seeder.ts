import {QueryInterface} from 'sequelize'

export const up = async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkInsert(
        'users',
        [
            // {
            //     email: 'john.doe@example.com',
            //     uname: 'John',
            //     usurname: 'Doe',
            //     ufathername: 'Michael',
            //     cancontact: true,
            //     isactive: true,
            //     createdAt: new Date(),
            //     updatedAt: new Date()
            // },
            // {
            //     email: 'jane.smith@example.com',
            //     uname: 'Jane',
            //     usurname: 'Smith',
            //     ufathername: 'William',
            //     cancontact: true,
            //     isactive: true,
            //     createdAt: new Date(),
            //     updatedAt: new Date()
            // },
            // {
            //     email: 'bob.johnson@example.com',
            //     name: 'Bob',
            //     surName: 'Johnson',
            //     fatherName: 'Robert',
            //     canContact: false,
            //     isActive: true,
            //     createdAt: new Date(),
            //     updatedAt: new Date()
            // }
        ],
        {}
    )
}

export const down = async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkDelete('users', {}, {})
}
