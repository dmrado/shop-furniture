import { CategoryModel } from '../models/category.model';

export async function seedCategories() {
    try {
        // Очистка таблицы перед заполнением (опционально)
        await CategoryModel.destroy({ where: {}, truncate: true });

        const categories = [
            // Электроника
            { name: 'Смартфоны', grandCategory: 'Электроника', slug: 'smartfoni', image: '/kofeinii-stolik-elite.webp' },
            { name: 'Ноутбуки', grandCategory: 'Электроника', slug: 'notebooks', image: '/modulnyj-divan.jpg' },
            { name: 'Планшеты', grandCategory: 'Электроника', slug: 'plansheti', image: '/kofeinii-stolik-elite.webp' },
            { name: 'Телевизоры', grandCategory: 'Электроника', slug: 'tv', image: '/modulnyj-divan.jpg' },
            { name: 'Аудиосистемы', grandCategory: 'Электроника', slug: 'audiosistemi', image: '/kofeinii-stolik-elite.webp' },
            { name: 'Фотоаппараты', grandCategory: 'Электроника', slug: 'fotoapparati', image: '/modulnyj-divan.jpg' },
            { name: 'Игровые консоли', grandCategory: 'Электроника', slug: 'konsoli', image: '/kofeinii-stolik-elite.webp' },
            { name: 'Умные часы', grandCategory: 'Электроника', slug: 'smartwaches', image: '/modulnyj-divan.jpg' },

            // Одежда
            { name: 'Мужская одежда', grandCategory: 'Одежда', slug: 'mujskayaodejda', image: '/kofeinii-stolik-elite.webp' },
            { name: 'Женская одежда', grandCategory: 'Одежда', slug: 'jenskayaodejda', image: '/modulnyj-divan.jpg' },
            { name: 'Детская одежда', grandCategory: 'Одежда', slug: 'detodejda', image: '/kofeinii-stolik-elite.webp' },
            { name: 'Спортивная одежда', grandCategory: 'Одежда', slug: 'sportodejda', image: '/modulnyj-divan.jpg' },
            { name: 'Верхняя одежда', grandCategory: 'Одежда', slug: 'verhodejda', image: '/kofeinii-stolik-elite.webp' },
            { name: 'Нижнее белье', grandCategory: 'Одежда', slug: 'belio', image: '/modulnyj-divan.jpg' },

            // Обувь
            { name: 'Мужская обувь', grandCategory: 'Обувь', slug: 'mujobuv', image: '/kofeinii-stolik-elite.webp' },
            { name: 'Женская обувь', grandCategory: 'Обувь',slug: 'jenobuv',  image: '/modulnyj-divan.jpg' },
            { name: 'Детская обувь', grandCategory: 'Обувь', slug: 'detobuv', image: '/kofeinii-stolik-elite.webp' },
            { name: 'Спортивная обувь', grandCategory: 'Обувь', slug: 'sportobuv', image: '/modulnyj-divan.jpg' },

            // Мебель
            { name: 'Диваны', grandCategory: 'Мебель', slug: 'divani', image: '/modulnyj-divan.jpg' },
            { name: 'Кровати', grandCategory: 'Мебель', slug: 'krovati', image: '/kofeinii-stolik-elite.webp' },
            { name: 'Столы', grandCategory: 'Мебель', slug: 'stoli', image: '/modulnyj-divan.jpg' },
            { name: 'Стулья', grandCategory: 'Мебель', slug: 'stulia', image: '/kofeinii-stolik-elite.webp' },
            { name: 'Шкафы', grandCategory: 'Мебель', slug: 'shkafi', image: '/modulnyj-divan.jpg' },
            { name: 'Комоды', grandCategory: 'Мебель', slug: 'komodi', image: '/kofeinii-stolik-elite.webp' },

            // Продукты питания
            { name: 'Молочные продукты', grandCategory: 'Продукты питания', slug: 'moloko', image: '/modulnyj-divan.jpg' },
            { name: 'Мясо и птица', grandCategory: 'Продукты питания', slug: 'miaso', image: '/kofeinii-stolik-elite.webp' },
            { name: 'Фрукты и овощи', grandCategory: 'Продукты питания', slug: 'frukti', image: '/modulnyj-divan.jpg' },
            { name: 'Хлебобулочные изделия', grandCategory: 'Продукты питания', slug: 'hleb', image: '/kofeinii-stolik-elite.webp' },
            { name: 'Напитки', grandCategory: 'Продукты питания', slug: 'napitki', image: '/modulnyj-divan.jpg' },

            // Косметика
            { name: 'Уход за лицом', grandCategory: 'Косметика', slug: 'litso', image: '/modulnyj-divan.jpg' },
            { name: 'Уход за телом', grandCategory: 'Косметика', slug: 'telo', image: '/kofeinii-stolik-elite.webp' },
            { name: 'Уход за волосами', grandCategory: 'Косметика', slug: 'volosi', image: '/modulnyj-divan.jpg' },
            { name: 'Декоративная косметика', grandCategory: 'Косметика', slug: 'denkosmetik', image: '/kofeinii-stolik-elite.webp' },
            { name: 'Парфюмерия', grandCategory: 'Косметика', slug: 'parfum', image: '/modulnyj-divan.jpg' },

            // Спорт и отдых
            { name: 'Тренажеры', grandCategory: 'Спорт и отдых', slug: 'trenajeri', image: '/kofeinii-stolik-elite.webp' },
            { name: 'Спортивный инвентарь', grandCategory: 'Спорт и отдых', slug: 'inventar', image: '/modulnyj-divan.jpg' },
            { name: 'Туристическое снаряжение', grandCategory: 'Спорт и отдых', slug: 'turistich', image: '/kofeinii-stolik-elite.webp' },
            { name: 'Велосипеды', grandCategory: 'Спорт и отдых', slug: 'velosipedi', image: '/modulnyj-divan.jpg' },
            { name: 'Товары для рыбалки', grandCategory: 'Спорт и отдых', slug: 'ribalka', image: '/kofeinii-stolik-elite.webp' },
            { name: 'Товары для охоты', grandCategory: 'Спорт и отдых', slug: 'ohota', image: '/modulnyj-divan.jpg' }
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
