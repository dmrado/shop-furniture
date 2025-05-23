import {CategoryModel} from '../models/category.model';

export async function seedCategories() {
    try {
        // Очистка таблицы перед заполнением (опционально)
        await CategoryModel.destroy({where: {}, truncate: true});

        const categories = [
            // Категории первого уровня
            {
                id: 1,
                name: 'Электроника',
                slug: 'electronics',
                image: '/modulnyj-divan.jpg',
                parentId: null
            },
            {
                id: 2,
                name: 'Одежда',
                slug: 'clothing',
                image: '/kofeinii-stolik-elite.webp',
                parentId: null
            },
            {
                id: 3,
                name: 'Мебель',
                slug: 'furniture',
                image: '/slavianskii-shkaf.jpg',
                parentId: null
            },

            // Категории второго уровня для Электроники
            {
                id: 4,
                name: 'Компьютеры',
                slug: 'computers',
                image: '/tumbochka-for-slavianskii-shkaf.jpg',
                parentId: 1
            },
            {
                id: 5,
                name: 'Смартфоны',
                slug: 'smartphones',
                image: '/modulnyj-divan.jpg',
                parentId: 1
            },
            {
                id: 6,
                name: 'Телевизоры',
                slug: 'tvs',
                image: '/kofeinii-stolik-elite.webp',
                parentId: 1
            },
            {
                id: 18,
                name: 'Микро-компьютеры',
                slug: 'microcomputers',
                image: '/tumbochka-for-slavianskii-shkaf.jpg',
                parentId: 1
            },
            {
                id: 19,
                name: 'Микро-Смартфоны',
                slug: 'microsmartphones',
                image: '/modulnyj-divan.jpg',
                parentId: 1
            },
            {
                id: 20,
                name: 'Микро-Телевизоры',
                slug: 'microtvs',
                image: '/kofeinii-stolik-elite.webp',
                parentId: 1
            },
            {
                id: 21,
                name: 'Мега-Смартфоны',
                slug: 'megasmartphones',
                image: '/modulnyj-divan.jpg',
                parentId: 1
            },
            {
                id: 22,
                name: 'Мега-Телевизоры',
                slug: 'megatvs',
                image: '/kofeinii-stolik-elite.webp',
                parentId: 1
            },


            // Категории третьего уровня для Компьютеров
            {
                id: 7,
                name: 'Ноутбуки',
                slug: 'laptops',
                image: '/tumbochka-for-slavianskii-shkaf.jpg',
                parentId: 4
            },
            {
                id: 8,
                name: 'Настольные компьютеры',
                slug: 'desktops',
                image: '/modulnyj-divan.jpg',
                parentId: 4
            },
            {
                id: 9,
                name: 'Планшеты',
                slug: 'tablets',
                image: '/kofeinii-stolik-elite.webp',
                parentId: 4
            },
            {
                id: 23,
                name: 'ИнфоНоутбуки',
                slug: 'infolaptops',
                image: '/tumbochka-for-slavianskii-shkaf.jpg',
                parentId: 4
            },
            {
                id: 24,
                name: 'ИнфоНастольные компьютеры',
                slug: 'infodesktops',
                image: '/modulnyj-divan.jpg',
                parentId: 4
            },
            {
                id: 25,
                name: 'ИнфоПланшеты',
                slug: 'infotablets',
                image: '/kofeinii-stolik-elite.webp',
                parentId: 4
            },
            {
                id: 26,
                name: 'Легко-Ноутбуки',
                slug: 'lightlaptops',
                image: '/tumbochka-for-slavianskii-shkaf.jpg',
                parentId: 4
            },
            {
                id: 27,
                name: 'Легко-Настольные компьютеры',
                slug: 'lightdesktops',
                image: '/modulnyj-divan.jpg',
                parentId: 4
            },
            {
                id: 28,
                name: 'Легко-Планшеты',
                slug: 'lighttablets',
                image: '/kofeinii-stolik-elite.webp',
                parentId: 4
            },



            // Категории четвертого уровня для Ноутбуков
            {
                id: 10,
                name: 'Игровые ноутбуки',
                slug: 'gaming-laptops',
                image: '/modulnyj-divan.jpg',
                parentId: 7
            },
            {
                id: 11,
                name: 'Бизнес ноутбуки',
                slug: 'business-laptops',
                image: '/tumbochka-for-slavianskii-shkaf.jpg',
                parentId: 7
            },

            // Категории второго уровня для Одежды
            {
                id: 12,
                name: 'Мужская одежда',
                slug: 'mens-clothing',
                image: '/kofeinii-stolik-elite.webp',
                parentId: 2
            },
            {
                id: 13,
                name: 'Женская одежда',
                slug: 'womens-clothing',
                image: '/modulnyj-divan.jpg',
                parentId: 2
            },
            {
                id: 14,
                name: 'Детская одежда',
                slug: 'kids-clothing',
                image: '/tumbochka-for-slavianskii-shkaf.jpg',
                parentId: 2
            },
            {
                id: 32,
                name: 'Большая Мужская одежда',
                slug: 'big-mens-clothing',
                image: '/kofeinii-stolik-elite.webp',
                parentId: 2
            },
            {
                id: 33,
                name: 'Большая Женская одежда',
                slug: 'big-womens-clothing',
                image: '/modulnyj-divan.jpg',
                parentId: 2
            },
            {
                id: 34,
                name: 'Большая Детская одежда',
                slug: 'big-kids-clothing',
                image: '/tumbochka-for-slavianskii-shkaf.jpg',
                parentId: 2
            },
            {
                id: 35,
                name: 'Кошачья одежда',
                slug: 'cats-clothing',
                image: '/kofeinii-stolik-elite.webp',
                parentId: 2
            },
            {
                id: 36,
                name: 'Собачья одежда',
                slug: 'dog-clothing',
                image: '/modulnyj-divan.jpg',
                parentId: 2
            },
            {
                id: 37,
                name: 'Одежда для хомяков',
                slug: 'hamster-clothing',
                image: '/tumbochka-for-slavianskii-shkaf.jpg',
                parentId: 2
            },

            // Категории второго уровня для Мебели
            {
                id: 15,
                name: 'Мебель для гостиной',
                slug: 'living-room',
                image: '/kofeinii-stolik-elite.webp',
                parentId: 3
            },
            {
                id: 16,
                name: 'Мебель для спальни',
                slug: 'bedroom',
                image: '/tumbochka-for-slavianskii-shkaf.jpg',
                parentId: 3
            },
            {
                id: 17,
                name: 'Кухонная мебель',
                slug: 'kitchen',
                image: '/modulnyj-divan.jpg',
                parentId: 3
            },
            {
                id: 45,
                name: 'Мега мебель для гостиной',
                slug: 'mega-living-room',
                image: '/kofeinii-stolik-elite.webp',
                parentId: 3
            },
            {
                id: 46,
                name: 'Мега мебель для спальни',
                slug: 'mega-bedroom',
                image: '/tumbochka-for-slavianskii-shkaf.jpg',
                parentId: 3
            },
            {
                id: 47,
                name: 'Мега Кухонная мебель',
                slug: 'mega-kitchen',
                image: '/modulnyj-divan.jpg',
                parentId: 3
            },
            {
                id: 48,
                name: 'Мини мебель для гостиной',
                slug: 'mini-living-room',
                image: '/kofeinii-stolik-elite.webp',
                parentId: 3
            },
            {
                id: 49,
                name: 'Мини мебель для спальни',
                slug: 'mini-bedroom',
                image: '/tumbochka-for-slavianskii-shkaf.jpg',
                parentId: 3
            },
            {
                id: 50,
                name: 'Мини кухонная мебель',
                slug: 'mini-kitchen',
                image: '/modulnyj-divan.jpg',
                parentId: 3
            },
            {
                id: 51,
                name: 'Не мебель для гостиной',
                slug: 'no-living-room',
                image: '/kofeinii-stolik-elite.webp',
                parentId: 3
            },
            {
                id: 52,
                name: 'Не мебель для спальни',
                slug: 'no-bedroom',
                image: '/tumbochka-for-slavianskii-shkaf.jpg',
                parentId: 3
            },
            {
                id: 53,
                name: 'Не Кухонная мебель',
                slug: 'no-kitchen',
                image: '/modulnyj-divan.jpg',
                parentId: 3
            }
        ];

        // Создаем записи в базе данных
        await CategoryModel.bulkCreate(categories);

        console.log('Категории успешно добавлены в базу данных');
    } catch (error) {
        console.error('Ошибка при заполнении таблицы категорий:', error);
    }
}

// Вызов функции для заполнения базы данных
// seedCategories()
