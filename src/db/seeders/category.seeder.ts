import { CategoryModel } from '../models/category.model'
import { ProductCategoryDTO, ProductCategoryModel } from '@/db/models/product_category.model'

export async function seedCategories() {
    try {
        // Очистка таблицы перед заполнением (опционально, но рекомендуется для seeders)
        await CategoryModel.destroy({ where: {}, truncate: true })

        const categories = [
            // ==================================================================================================
            // Категории первого уровня (Мебель для дома, Мебель для офиса, Декор и Интерьер)
            // ==================================================================================================
            {
                id: 1,
                name: 'Мебель для дома',
                slug: 'mebel-dlya-doma',
                image: '/images/categories/domashnyaya-mebel.jpg', // Пример пути
                parentId: null
            },
            {
                id: 2,
                name: 'Мебель для офиса',
                slug: 'mebel-dlya-ofisa',
                image: '/images/categories/ofisnaya-mebel.jpg', // Пример пути
                parentId: null
            },
            {
                id: 3,
                name: 'Декор и Интерьер',
                slug: 'dekor-i-interer',
                image: '/images/categories/dekor.jpg', // Пример пути
                parentId: null
            },

            // ==================================================================================================
            // Категории второго уровня для "Мебель для дома" (parentId: 1)
            // ==================================================================================================
            {
                id: 4,
                name: 'Мебель для гостиной',
                slug: 'mebel-dlya-gostinoy',
                image: '/images/categories/gostinaya.jpg',
                parentId: 1
            },
            {
                id: 5,
                name: 'Мебель для спальни',
                slug: 'mebel-dlya-spalni',
                image: '/images/categories/spalnya.jpg',
                parentId: 1
            },
            {
                id: 6,
                name: 'Мебель для кухни',
                slug: 'mebel-dlya-kuhni',
                image: '/images/categories/kuhnya.jpg',
                parentId: 1
            },
            {
                id: 18,
                name: 'Мебель для детской',
                slug: 'mebel-dlya-detskoi',
                image: '/images/categories/detskaya.jpg',
                parentId: 1
            },
            {
                id: 19,
                name: 'Мебель для прихожей',
                slug: 'mebel-dlya-prihozhei',
                image: '/images/categories/prihozhaya.jpg',
                parentId: 1
            },
            {
                id: 20,
                name: 'Мебель для ванной',
                slug: 'mebel-dlya-vannoi',
                image: '/images/categories/vannaya.jpg',
                parentId: 1
            },
            {
                id: 21,
                name: 'Комплекты мебели',
                slug: 'komplekty-mebeli',
                image: '/images/categories/komplekty.jpg',
                parentId: 1
            },
            {
                id: 22,
                name: 'Садовая мебель',
                slug: 'sadovaya-mebel',
                image: '/images/categories/sadovaya.jpg',
                parentId: 1
            },

            // ==================================================================================================
            // Категории третьего уровня для "Мебель для гостиной" (parentId: 4)
            // ==================================================================================================
            {
                id: 7,
                name: 'Диваны и кресла',
                slug: 'divany-kresla',
                image: '/images/categories/divany.jpg',
                parentId: 4
            },
            {
                id: 8,
                name: 'Столы журнальные',
                slug: 'stoly-zhurnalnye',
                image: '/images/categories/zhurnalnye-stoly.jpg',
                parentId: 4
            },
            {
                id: 9,
                name: 'Тумбы ТВ',
                slug: 'tumby-tv',
                image: '/images/categories/tumby-tv.jpg',
                parentId: 4
            },
            {
                id: 23,
                name: 'Стенки и горки',
                slug: 'stenki-gorki',
                image: '/images/categories/stenki.jpg',
                parentId: 4
            },
            {
                id: 24,
                name: 'Стеллажи и витрины',
                slug: 'stellazhi-vitriny',
                image: '/images/categories/stellazhi.jpg',
                parentId: 4
            },
            {
                id: 25,
                name: 'Комоды и буфеты',
                slug: 'komody-bufety',
                image: '/images/categories/komody.jpg',
                parentId: 4
            },
            {
                id: 26,
                name: 'Обеденные группы',
                slug: 'obedinnye-gruppy',
                image: '/images/categories/obedinnye.jpg',
                parentId: 4
            },
            {
                id: 27,
                name: 'Пуфы и банкетки',
                slug: 'pufy-banketki',
                image: '/images/categories/pufy.jpg',
                parentId: 4
            },
            {
                id: 28,
                name: 'Витрины для посуды',
                slug: 'vitriny-dlya-posudy',
                image: '/images/categories/vitriny-posuda.jpg',
                parentId: 4
            },

            // ==================================================================================================
            // Категории четвертого уровня для "Диваны и кресла" (parentId: 7)
            // ==================================================================================================
            {
                id: 10,
                name: 'Модульные диваны',
                slug: 'modulnye-divany',
                image: '/images/categories/modulnye-divany.jpg',
                parentId: 7
            },
            {
                id: 11,
                name: 'Прямые диваны',
                slug: 'pryamye-divany',
                image: '/images/categories/pryamye-divany.jpg',
                parentId: 7
            },
            {
                id: 29,
                name: 'Угловые диваны',
                slug: 'uglovye-divany',
                image: '/images/categories/uglovye-divany.jpg',
                parentId: 7
            },
            {
                id: 30,
                name: 'Кресла',
                slug: 'kresla',
                image: '/images/categories/kresla.jpg',
                parentId: 7
            },
            {
                id: 31,
                name: 'Кресла-кровати',
                slug: 'kresla-krovati',
                image: '/images/categories/kresla-krovati.jpg',
                parentId: 7
            },

            // ==================================================================================================
            // Категории второго уровня для "Мебель для офиса" (parentId: 2)
            // ==================================================================================================
            {
                id: 12,
                name: 'Офисные столы',
                slug: 'ofisnye-stoly',
                image: '/images/categories/ofisnye-stoly.jpg',
                parentId: 2
            },
            {
                id: 13,
                name: 'Офисные кресла',
                slug: 'ofisnye-kresla',
                image: '/images/categories/ofisnye-kresla.jpg',
                parentId: 2
            },
            {
                id: 14,
                name: 'Шкафы для документов',
                slug: 'shkafy-dlya-dokumentov',
                image: '/images/categories/shkafy-dokumenty.jpg',
                parentId: 2
            },
            {
                id: 32,
                name: 'Стеллажи офисные',
                slug: 'stellazhi-ofisnye',
                image: '/images/categories/stellazhi-ofis.jpg',
                parentId: 2
            },
            {
                id: 33,
                name: 'Тумбы офисные',
                slug: 'tumby-ofisnye',
                image: '/images/categories/tumby-ofis.jpg',
                parentId: 2
            },
            {
                id: 34,
                name: 'Ресепшн стойки',
                slug: 'resepshn-stoiki',
                image: '/images/categories/resepshn.jpg',
                parentId: 2
            },
            {
                id: 35,
                name: 'Перегородки офисные',
                slug: 'peregorodki-ofisnye',
                image: '/images/categories/peregorodki.jpg',
                parentId: 2
            },
            {
                id: 36,
                name: 'Мебель для персонала',
                slug: 'mebel-dlya-personala',
                image: '/images/categories/mebel-personal.jpg',
                parentId: 2
            },
            {
                id: 37,
                name: 'Мебель для переговорных',
                slug: 'mebel-dlya-peregovornyh',
                image: '/images/categories/mebel-peregovornye.jpg',
                parentId: 2
            },

            // ==================================================================================================
            // Категории второго уровня для "Декор и Интерьер" (parentId: 3)
            // ==================================================================================================
            {
                id: 15,
                name: 'Освещение',
                slug: 'osveschenie',
                image: '/images/categories/osveschenie.jpg',
                parentId: 3
            },
            {
                id: 16,
                name: 'Текстиль',
                slug: 'tekstil',
                image: '/images/categories/tekstil.jpg',
                parentId: 3
            },
            {
                id: 17,
                name: 'Декор для стен',
                slug: 'dekor-dlya-sten',
                image: '/images/categories/dekor-sten.jpg',
                parentId: 3
            },
            {
                id: 45,
                name: 'Зеркала',
                slug: 'zerkala',
                image: '/images/categories/zerkala.jpg',
                parentId: 3
            },
            {
                id: 46,
                name: 'Вазы и кашпо',
                slug: 'vazy-kashpo',
                image: '/images/categories/vazy-kashpo.jpg',
                parentId: 3
            },
            {
                id: 47,
                name: 'Картины и постеры',
                slug: 'kartiny-postery',
                image: '/images/categories/kartiny.jpg',
                parentId: 3
            },
            {
                id: 48,
                name: 'Декоративные подушки',
                slug: 'dekorativnye-podushki',
                image: '/images/categories/podushki.jpg',
                parentId: 3
            },
            {
                id: 49,
                name: 'Искусственные растения',
                slug: 'iskusstvennye-rasteniya',
                image: '/images/categories/rasteniya.jpg',
                parentId: 3
            },
            {
                id: 50,
                name: 'Декоративные фигурки',
                slug: 'dekorativnye-figurki',
                image: '/images/categories/figurki.jpg',
                parentId: 3
            },
            {
                id: 51,
                name: 'Свечи и подсвечники',
                slug: 'svechi-podsvechniki',
                image: '/images/categories/svechi.jpg',
                parentId: 3
            },
            {
                id: 52,
                name: 'Ароматы для дома',
                slug: 'aromaty-dlya-doma',
                image: '/images/categories/aromaty.jpg',
                parentId: 3
            },
            {
                id: 53,
                name: 'Настольные часы',
                slug: 'nastolnye-chasy',
                image: '/images/categories/chasy.jpg',
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

export async function seedProductCategories() {
    try {
        // Очистка таблицы перед заполнением (опционально)
        await ProductCategoryModel.destroy({ where: {}, truncate: true });

        const productCategoryLinks: ProductCategoryDTO[] = [
            // Пример связей:
            // Продукт 15 (условный продукт) связан с категориями:
            // 1 (Мебель для дома)
            // 6 (Мебель для кухни)
            // 20 (Мебель для ванной)
            {
                productId: 15,
                categoryId: 1,
            },
            {
                productId: 15,
                categoryId: 6,
            },
            {
                productId: 15,
                categoryId: 20,
            },
            // Добавим еще примеры, чтобы показать работу с "реальными" категориями
            { productId: 1, categoryId: 7 }, // Продукт 1 (диван) -> Диваны и кресла
            { productId: 1, categoryId: 10 }, // Продукт 1 (диван) -> Модульные диваны
            { productId: 2, categoryId: 12 }, // Продукт 2 (офисный стол) -> Офисные столы
            { productId: 3, categoryId: 15 }, // Продукт 3 (лампа) -> Освещение
            { productId: 4, categoryId: 16 }, // Продукт 4 (шторы) -> Текстиль
            { productId: 5, categoryId: 47 }, // Продукт 5 (картина) -> Картины и постеры

        ]

        // Создаем записи в базе данных
        await ProductCategoryModel.bulkCreate(productCategoryLinks)

        console.log('Связи продуктов с категориями успешно добавлены в базу данных')
    } catch (error) {
        console.error('Ошибка при заполнении таблицы связей продуктов с категориями:', error)
    }
}

// Вызов функции для заполнения базы данных (для локального тестирования)
// seedCategories();
// seedProductCategories(); // Не забудьте вызвать после seedCategories