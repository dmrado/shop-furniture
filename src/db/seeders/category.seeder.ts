import { CategoryModel } from '../models/category.model';

export async function seedCategories() {
    try {
        // Очистка таблицы перед заполнением (опционально)
        await CategoryModel.destroy({ where: {}, truncate: true });

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
