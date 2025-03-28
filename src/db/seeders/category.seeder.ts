import { CategoryModel } from '../models/category.model';

export async function seedCategories() {
    try {
        // Очистка таблицы перед заполнением (опционально)
        await CategoryModel.destroy({ where: {}, truncate: true });

        const categories = [
            // Электроника
            { name: 'Смартфоны', grandCategory: 'Электроника' },
            { name: 'Ноутбуки', grandCategory: 'Электроника' },
            { name: 'Планшеты', grandCategory: 'Электроника' },
            { name: 'Телевизоры', grandCategory: 'Электроника' },
            { name: 'Аудиосистемы', grandCategory: 'Электроника' },
            { name: 'Фотоаппараты', grandCategory: 'Электроника' },
            { name: 'Игровые консоли', grandCategory: 'Электроника' },
            { name: 'Умные часы', grandCategory: 'Электроника' },

            // Одежда
            { name: 'Мужская одежда', grandCategory: 'Одежда' },
            { name: 'Женская одежда', grandCategory: 'Одежда' },
            { name: 'Детская одежда', grandCategory: 'Одежда' },
            { name: 'Спортивная одежда', grandCategory: 'Одежда' },
            { name: 'Верхняя одежда', grandCategory: 'Одежда' },
            { name: 'Нижнее белье', grandCategory: 'Одежда' },

            // Обувь
            { name: 'Мужская обувь', grandCategory: 'Обувь' },
            { name: 'Женская обувь', grandCategory: 'Обувь' },
            { name: 'Детская обувь', grandCategory: 'Обувь' },
            { name: 'Спортивная обувь', grandCategory: 'Обувь' },

            // Мебель
            { name: 'Диваны', grandCategory: 'Мебель' },
            { name: 'Кровати', grandCategory: 'Мебель' },
            { name: 'Столы', grandCategory: 'Мебель' },
            { name: 'Стулья', grandCategory: 'Мебель' },
            { name: 'Шкафы', grandCategory: 'Мебель' },
            { name: 'Комоды', grandCategory: 'Мебель' },

            // Продукты питания
            { name: 'Молочные продукты', grandCategory: 'Продукты питания' },
            { name: 'Мясо и птица', grandCategory: 'Продукты питания' },
            { name: 'Фрукты и овощи', grandCategory: 'Продукты питания' },
            { name: 'Хлебобулочные изделия', grandCategory: 'Продукты питания' },
            { name: 'Напитки', grandCategory: 'Продукты питания' },

            // Косметика
            { name: 'Уход за лицом', grandCategory: 'Косметика' },
            { name: 'Уход за телом', grandCategory: 'Косметика' },
            { name: 'Уход за волосами', grandCategory: 'Косметика' },
            { name: 'Декоративная косметика', grandCategory: 'Косметика' },
            { name: 'Парфюмерия', grandCategory: 'Косметика' },

            // Спорт и отдых
            { name: 'Тренажеры', grandCategory: 'Спорт и отдых' },
            { name: 'Спортивный инвентарь', grandCategory: 'Спорт и отдых' },
            { name: 'Туристическое снаряжение', grandCategory: 'Спорт и отдых' },
            { name: 'Велосипеды', grandCategory: 'Спорт и отдых' },
            { name: 'Товары для рыбалки', grandCategory: 'Спорт и отдых' },
            { name: 'Товары для охоты', grandCategory: 'Спорт и отдых' }
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
