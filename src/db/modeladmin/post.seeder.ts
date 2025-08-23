import { sequelize } from '@/db/connection'
import Sequelize, { QueryInterface, DataTypes, QueryTypes } from 'sequelize'

const queryInterface: QueryInterface = sequelize.getQueryInterface()

export const up = (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface
        .bulkInsert(
            'posts',
            [
                {
                    title: 'Title Post-1',
                    text: 'Text Post-1, Text Post-1, Text Post-1,Text Post-1 Text Post-1, Text Post-1, Text Post-1,Text Post-1 м Text Post-1, Text Post-1, Text Post-1,Text Post-1 Text Post-1, Text Post-1, Text Post-1,Text Post-1 Text Post-1, Text Post-1, Text Post-1,Text Post-1',
                    preview:
                        'Preview Post-1, Preview Post-1, Text Post-1,Text Post-1',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Title Post-2',
                    text: 'Text Post-2, Text Post-2, Text Post-2,Text Post-2, Text Post-2,Text Post-2 Text Post-2, Text Post-2, Text Post-2,Text Post-2, Text Post-2,Text Post-2, Text Post-2, Text Post-2, Text Post-2,Text Post-2, Text Post-2,Text Post-2, Text Post-2, Text Post-2, Text Post-2,Text Post-2, Text Post-2,Text Post-2,Text Post-2, Text Post-2, Text Post-2,Text Post-2, Text Post-2,Text Post-2',
                    preview: 'Preview Post-2, Preview Post-2, Preview Post-2',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Title Post-3',
                    text: 'Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3',
                    preview: 'Preview Post-3, Preview Post-3, Preview Post-3',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Title Post-4',
                    text: 'Post-4 Post-4t saepe reiciendis voluptatem adipisciunt voluptatem rerum illo velits  Post-4, Post-4, Post-4  Post-4, Post-4, Post-4  Post-4, Post-4, Post-4  Post-4, Post-4, Post-4  Post-4, Post-4, Post-4  Post-4, Post-4, Post-4 ',
                    preview: 'Post-4, Post-4, Post-4, Post-4, Post-4, Post-4',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Title Post-5',
                    text: 'Text Post-5, Text Post-5,  reiciendis voluptatem adipiscsunt voluptatem rerum illo velits Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  ',
                    preview: 'Text Post-5, Text Post-5,  reiciendis volu',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Title Post-6',
                    text: 'Text Post-6, Text Post-6,  reiciendis voluptatem adipiscsunt voluptatem rerum illo velits Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  ',
                    preview: 'Text Post-6, Text Post-6,  reiciend',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Title Post-7',
                    text: 'Text Post-7, Text Post-7,  reiciendis voluptatem adipiscsunt voluptatem rerum illo velits Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  ',
                    preview:
                        'Text Post-7, Text Post-7,  reiciendis voluptatem ad',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Title Post-8',
                    text: 'Text Post-8, Text Post-8,  reiciendis voluptatem adipiscsunt voluptatem rerum illo velits Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  ',
                    preview:
                        'Text Post-8, Text Post-8,  reiciendis voluptatem adip',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Title Post-9',
                    text: 'Text Post-9, Text Post-9,  reiciendis voluptatem adipiscsunt voluptatem rerum illo velits Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  ',
                    preview:
                        'Text Post-9, Text Post-9,  reiciendis voluptatem adipi',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Title Post-10',
                    text: 'Text Post-10, Text Post-10,  reiciendis voluptatem adipiscsunt voluptatem rerum illo velits Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  ',
                    preview:
                        'Text Post-10, Text Post-10,  reiciendis voluptatem ad',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Title Post-11',
                    text: 'Text Post-11, Text Post-11,  reiciendis voluptatem adipiscsunt voluptatem rerum illo velits Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  ',
                    preview:
                        'Text Post-11, Text Post-11,  reiciendis voluptatem adipis',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Title Post-12',
                    text: 'Text Post-12, Text Post-12,  reiciendis voluptatem adipiscsunt voluptatem rerum illo velits Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  ',
                    preview:
                        'Text Post-12, Text Post-12,  reiciendis voluptatem adipiscsunt',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Title Post-13',
                    text: 'Text Post-13, Text Post-13,  reiciendis voluptatem adipiscsunt voluptatem rerum illo velits Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  ',
                    preview:
                        'Text Post-13, Text Post-13,  reiciendis voluptatem adip',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Title Post-14',
                    text: 'Text Post-14, Text Post-14,  reiciendis voluptatem adipiscsunt voluptatem rerum illo velits Text Preiciendis voluptatem adipiscsunt voluptatem rerum illo velits Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  ',
                    preview:
                        'Text Post-14, Text Post-14,  reiciendis voluptatem adipiscsunt voluptatem',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Title Post-15',
                    text: 'Text Post-15, Text Post-15,  reiciendis voluptatem adipiscsunt voluptatem rerum illo velits Treiciendis voluptatem adipiscsunt voluptatem rerum illo velitst Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  ',
                    preview:
                        'Text Post-15, Text Post-15,  reiciendis voluptatem adipiscsunt volu',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Title Post-16',
                    text: 'Text Post-16, Text Post-16, Text Post-16,Text Post-16 Text Post-16, reiciendis voluptatem adipiscsunt voluptatem rerum illo velitsxt Post-1,Text Post-1 Text Post-1, Text Post-1, Text Post-1,Text Post-1',
                    preview:
                        'Text Post-16, Text Post-16, Text Post-16,Text Post-16 Text Post',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Title Post-17',
                    text: 'Text Post-17, Text Post-17, Text Posreiciendis voluptatem adipiscsunt voluptatem rerum illo velitsTreiciendis voluptatem adipiscsunt voluptatem rerum illo velitsost-2,Text Post-2, Text Post-2,Text Post-2, Text Post-2, Text Post-2, Text Post-2,Text Post-2, Text Post-2,Text Post-2,Text Post-2, Text Post-2, Text Post-2,Text Post-2, Text Post-2,Text Post-2',
                    preview: 'Text Post-17, Text Post-17, Text Posreicien',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Title Post-18',
                    text: 'Title Post-18, Title Post-18, Title Post-18,  reiciendis voluptatem adipiscsunt voluptatem rerum illo velitst-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3, Title Post-3',
                    preview: 'Title Post-18, Title Post-18, Title Post-18,  ',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Title Post-19',
                    text: 'Post-19 Post-19 saepe reiciendis voluptatem reiciendis voluptatem adipiscsunt voluptatem rerum illo velits  Post-4, Post-4, Post-4  Post-4, Post-4, Post-4  Post-4, Post-4, Post-4 ',
                    preview: 'Post-19 Post-19 saepe reiciendis voluptatem',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Title Post-20',
                    text: 'Text Post-20, Text Post-20,  reiciendis voluptreiciendis voluptatem adipiscsunt voluptatem rerum illo velitst-5, Text Post-5,  Text Post-5, Text Post-5,  Text Post-5, Text Post-5,  ',
                    preview: 'Text Post-20, Text Post-20,  reiciendis vol',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        )
        .then(() => {})
}

export const down = (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.bulkDelete('posts', {}, {}).then((): void => {})
}
