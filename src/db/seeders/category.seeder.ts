import { CategoryModel } from '../models/category.model';

export async function seedCategories() {
    try {
        // Очистка таблицы перед заполнением (опционально)
        await CategoryModel.destroy({ where: {}, truncate: true });

        const categories = [
            // Электроника
            { name: 'Смартфоны', grandCategory: 'Электроника', image: '/images/categories/smartphones.jpg' },
            { name: 'Ноутбуки', grandCategory: 'Электроника', image: '/images/categories/laptops.jpg' },
            { name: 'Планшеты', grandCategory: 'Электроника', image: '/images/categories/tablets.jpg' },
            { name: 'Телевизоры', grandCategory: 'Электроника', image: '/images/categories/tvs.jpg' },
            { name: 'Аудиосистемы', grandCategory: 'Электроника', image: '/images/categories/audio.jpg' },
            { name: 'Фотоаппараты', grandCategory: 'Электроника', image: '/images/categories/cameras.jpg' },
            { name: 'Игровые консоли', grandCategory: 'Электроника', image: '/images/categories/consoles.jpg' },
            { name: 'Умные часы', grandCategory: 'Электроника', image: '/images/categories/smartwatches.jpg' },

            // Одежда
            { name: 'Мужская одежда', grandCategory: 'Одежда', image: '/images/categories/mens_clothing.jpg' },
            { name: 'Женская одежда', grandCategory: 'Одежда', image: '/images/categories/womens_clothing.jpg' },
            { name: 'Детская одежда', grandCategory: 'Одежда', image: '/images/categories/kids_clothing.jpg' },
            { name: 'Спортивная одежда', grandCategory: 'Одежда', image: '/images/categories/sports_clothing.jpg' },
            { name: 'Верхняя одежда', grandCategory: 'Одежда', image: '/images/categories/outerwear.jpg' },
            { name: 'Нижнее белье', grandCategory: 'Одежда', image: '/images/categories/underwear.jpg' },

            // Обувь
            { name: 'Мужская обувь', grandCategory: 'Обувь', image: '/images/categories/mens_shoes.jpg' },
            { name: 'Женская обувь', grandCategory: 'Обувь', image: '/images/categories/womens_shoes.jpg' },
            { name: 'Детская обувь', grandCategory: 'Обувь', image: '/images/categories/kids_shoes.jpg' },
            { name: 'Спортивная обувь', grandCategory: 'Обувь', image: '/images/categories/sports_shoes.jpg' },

            // Мебель
            { name: 'Диваны', grandCategory: 'Мебель', image: '/images/categories/sofas.jpg' },
            { name: 'Кровати', grandCategory: 'Мебель', image: '/images/categories/beds.jpg' },
            { name: 'Столы', grandCategory: 'Мебель', image: '/images/categories/tables.jpg' },
            { name: 'Стулья', grandCategory: 'Мебель', image: '/images/categories/chairs.jpg' },
            { name: 'Шкафы', grandCategory: 'Мебель', image: '/images/categories/wardrobes.jpg' },
            { name: 'Комоды', grandCategory: 'Мебель', image: '/images/categories/dressers.jpg' },

            // Продукты питания
            { name: 'Молочные продукты', grandCategory: 'Продукты питания', image: '/images/categories/dairy.jpg' },
            { name: 'Мясо и птица', grandCategory: 'Продукты питания', image: '/images/categories/meat.jpg' },
            { name: 'Фрукты и овощи', grandCategory: 'Продукты питания', image: '/images/categories/fruits_vegetables.jpg' },
            { name: 'Хлебобулочные изделия', grandCategory: 'Продукты питания', image: '/images/categories/bakery.jpg' },
            { name: 'Напитки', grandCategory: 'Продукты питания', image: '/images/categories/beverages.jpg' },

            // Косметика
            { name: 'Уход за лицом', grandCategory: 'Косметика', image: '/images/categories/face_care.jpg' },
            { name: 'Уход за телом', grandCategory: 'Косметика', image: '/images/categories/body_care.jpg' },
            { name: 'Уход за волосами', grandCategory: 'Косметика', image: '/images/categories/hair_care.jpg' },
            { name: 'Декоративная косметика', grandCategory: 'Косметика', image: '/images/categories/makeup.jpg' },
            { name: 'Парфюмерия', grandCategory: 'Косметика', image: '/images/categories/perfume.jpg' },

            // Спорт и отдых
            { name: 'Тренажеры', grandCategory: 'Спорт и отдых', image: '/images/categories/fitness_equipment.jpg' },
            { name: 'Спортивный инвентарь', grandCategory: 'Спорт и отдых', image: '/images/categories/sports_equipment.jpg' },
            { name: 'Туристическое снаряжение', grandCategory: 'Спорт и отдых', image: '/images/categories/camping.jpg' },
            { name: 'Велосипеды', grandCategory: 'Спорт и отдых', image: '/images/categories/bicycles.jpg' },
            { name: 'Товары для рыбалки', grandCategory: 'Спорт и отдых', image: '/images/categories/fishing.jpg' },
            { name: 'Товары для охоты', grandCategory: 'Спорт и отдых', image: '/images/categories/hunting.jpg' }
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
