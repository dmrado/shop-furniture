// db/seeders/product.seeder.ts
import { ProductModel } from '@/db/models/product.model';
import { ProductCategoryModel } from '@/db/models/product_category.model'; // Импортируем модель для связей

export async function seedProducts() {
    try {
        console.log('Starting product seeding...');

        // Очистка таблиц перед заполнением
        await ProductCategoryModel.destroy({ truncate: true, cascade: true }); // Сначала связи, чтобы избежать ошибок внешних ключей
        await ProductModel.destroy({ truncate: true, cascade: true });
        console.log('Product and ProductCategory tables truncated.');

        const baseProductSeedData = [
            // ==================================================================================================
            // Ваши 14 изначальных продуктов, с обновленными ID и артикулами для консистентности
            // ==================================================================================================
            {
                id: 101, styleId: 1, brandId: 1, collectionId: 1, countryId: 1, isActive: true, isNew: true,
                articul: 'DIV-MOD-001', sku: 'MD001-BROWN', name: 'Модульный диван "Лаунж Про"',
                descriptionShort: 'Элегантный модульный диван с регулируемыми спинками, идеален для просторной гостиной.',
                descriptionLong: 'Модульный диван "Лаунж Про" выполнен в современном стиле, имеет прочный каркас из массива дерева и обивку из износостойкой рогожки. Секции легко перемещаются, позволяя создать идеальную конфигурацию для любого интерьера. Включает встроенные USB-порты и ниши для хранения.',
            },
            {
                id: 102, styleId: 2, brandId: 2, collectionId: 2, countryId: 2, isActive: true, isNew: false,
                articul: 'KRES-VEL-002', sku: 'KV002-BLUE', name: 'Велюровое кресло "Элегант"',
                descriptionShort: 'Изысканное кресло из велюра с резными деревянными ножками, добавляет роскоши интерьеру.',
                descriptionLong: 'Кресло "Элегант" — это воплощение классического стиля. Обивка из мягкого велюра синего цвета, каркас из бука, декорированные подлокотники. Идеально дополнит интерьер гостиной или кабинета, создавая атмосферу уюта и респектабельности.',
            },
            {
                id: 103, styleId: 1, brandId: 1, collectionId: 1, countryId: 1, isActive: true, isNew: true,
                articul: 'STO-ZUR-003', sku: 'SZ003-GLASS', name: 'Журнальный столик "Минимал"',
                descriptionShort: 'Современный журнальный столик со стеклянной столешницей и хромированным основанием.',
                descriptionLong: 'Журнальный столик "Минимал" привнесет легкость в вашу гостиную. Столешница из закаленного стекла, устойчивое металлическое основание. Практичное и стильное решение для хранения книг и напитков.',
            },
            {
                id: 104, styleId: 2, brandId: 2, collectionId: 2, countryId: 2, isActive: true, isNew: false,
                articul: 'KROV-KLAS-004', sku: 'KK004-WHITE', name: 'Кровать двуспальная "Гармония"',
                descriptionShort: 'Элегантная двуспальная кровать с мягким изголовьем и ортопедическим основанием.',
                descriptionLong: 'Кровать "Гармония" обеспечит идеальный сон. Изготовлена из натурального дерева, обтянута мягкой тканью. Высокое изголовье с каретной стяжкой создает атмосферу уюта и комфорта.',
            },
            {
                id: 105, styleId: 1, brandId: 1, collectionId: 1, countryId: 1, isActive: true, isNew: true,
                articul: 'SHKAF-KUP-005', sku: 'SK005-GREY', name: 'Шкаф-купе "Модерн"',
                descriptionShort: 'Вместительный шкаф-купе с зеркальными дверями и продуманной системой хранения.',
                descriptionLong: 'Шкаф-купе "Модерн" — идеальное решение для спальни. Две раздвижные двери, одна из которых зеркальная, обеспечивают экономию пространства. Внутри - полки, штанги для одежды и выдвижные ящики для удобной организации.',
            },
            {
                id: 106, styleId: 2, brandId: 2, collectionId: 2, countryId: 2, isActive: true, isNew: false,
                articul: 'KUX-GARN-006', sku: 'KG006-WOOD', name: 'Кухонный гарнитур "Прованс"',
                descriptionShort: 'Уютный кухонный гарнитур в стиле прованс с элементами состаренного дерева.',
                descriptionLong: 'Гарнитур "Прованс" создаст атмосферу французской деревни на вашей кухне. Фасады из МДФ с патиной, фурнитура под бронзу, встроенная сушка для посуды. Отличное решение для тех, кто ценит тепло и домашний уют.',
            },
            {
                id: 107, styleId: 1, brandId: 1, collectionId: 1, countryId: 1, isActive: true, isNew: true,
                articul: 'KROV-DET-007', sku: 'KD007-PINK', name: 'Детская кровать-чердак "Фантазия"',
                descriptionShort: 'Многофункциональная кровать-чердак со встроенным столом и шкафом для детской.',
                descriptionLong: 'Кровать-чердак "Фантазия" — это идеальное решение для небольшой детской комнаты. Объединяет спальное место, рабочую зону и систему хранения, оставляя много места для игр. Изготовлена из безопасных материалов.',
            },
            {
                id: 108, styleId: 2, brandId: 2, collectionId: 2, countryId: 2, isActive: true, isNew: false,
                articul: 'STO-OFIS-008', sku: 'SO008-WALNUT', name: 'Офисный стол "Директор"',
                descriptionShort: 'Представительный офисный стол из натурального шпона ореха с кожаной вставкой.',
                descriptionLong: 'Стол "Директор" создан для комфортной и продуктивной работы. Массивная столешница, элегантные линии, встроенные кабель-каналы. Идеально подходит для руководителя, подчеркивая статус и вкус.',
            },
            {
                id: 109, styleId: 3, brandId: 3, collectionId: 3, countryId: 3, isActive: true, isNew: true,
                articul: 'LAMP-POT-009', sku: 'LP009-BLACK', name: 'Потолочная люстра "Эдисон"',
                descriptionShort: 'Индустриальная потолочная люстра с открытыми лампами Эдисона, идеальна для лофта.',
                descriptionLong: 'Люстра "Эдисон" привнесет неповторимый шарм в ваш интерьер. Металлический каркас черного цвета, открытые патроны для ламп Эдисона (не входят в комплект). Создает уютное, теплое освещение.',
            },
            {
                id: 110, styleId: 4, brandId: 4, collectionId: 4, countryId: 4, isActive: true, isNew: false,
                articul: 'PLE-VYZ-010', sku: 'PV010-GREY', name: 'Плед вязаный "Сканди-Уют"',
                descriptionShort: 'Мягкий вязаный плед из натуральной шерсти, идеален для создания уюта.',
                descriptionLong: 'Плед "Сканди-Уют" — это воплощение тепла и комфорта. Изготовлен из высококачественной шерсти мериноса, крупная вязка. Отлично подходит для прохладных вечеров и станет стильным акцентом в интерьере гостиной или спальни.',
            },
            {
                id: 111, styleId: 3, brandId: 3, collectionId: 5, countryId: 1, isActive: true, isNew: true,
                articul: 'PAN-ABS-011', sku: 'PA011-MULTI', name: 'Декоративное панно "Городские ритмы"',
                descriptionShort: 'Абстрактное металлическое панно на стену в стиле лофт.',
                descriptionLong: 'Панно "Городские ритмы" выполнено из высококачественного металла, имеет многослойную покраску. Создает динамичный и современный акцент на стене. Легко монтируется.',
            },
            {
                id: 112, styleId: 2, brandId: 2, collectionId: 2, countryId: 2, isActive: true, isNew: false,
                articul: 'ZERK-REZ-012', sku: 'ZR012-GOLD', name: 'Зеркало напольное "Версаль"',
                descriptionShort: 'Напольное зеркало в резной золотой раме, добавляет роскоши интерьеру.',
                descriptionLong: 'Зеркало "Версаль" с массивной рамой ручной работы. Идеально для прихожей или спальни, зрительно расширяет пространство и служит элегантным элементом декора.',
            },
            {
                id: 113, styleId: 5, brandId: 5, collectionId: 6, countryId: 5, isActive: true, isNew: true,
                articul: 'FIG-SLON-013', sku: 'FS013-BRONZE', name: 'Фигурка "Слон мудрости"',
                descriptionShort: 'Декоративная статуэтка слона из бронзы, символ мудрости и удачи.',
                descriptionLong: 'Фигурка "Слон мудрости" выполнена из высококачественной бронзы с детальной проработкой. Идеальное дополнение для рабочего стола или книжной полки. Принесет гармонию и процветание в ваш дом.',
            },
            {
                id: 114, styleId: 1, brandId: 1, collectionId: 1, countryId: 1, isActive: true, isNew: false,
                articul: 'STO-KUX-014', sku: 'SK014-WHITE', name: 'Стол обеденный "Семейный"',
                descriptionShort: 'Раздвижной обеденный стол для кухни или столовой, в современном стиле.',
                descriptionLong: 'Стол "Семейный" — универсальное решение для любой кухни или гостиной. Прочный деревянный каркас, столешница из ЛДСП с возможностью увеличения. Идеально подходит как для повседневных обедов, так и для больших застолий.',
            }
        ];

        const productSeedDataToCreate = [...baseProductSeedData];
        const productCategoryLinks = [];

        // Добавляем связи для базовых продуктов
        productCategoryLinks.push(
            { productId: 101, categoryId: 4 }, { productId: 101, categoryId: 7 }, { productId: 101, categoryId: 10 },
            { productId: 102, categoryId: 4 }, { productId: 102, categoryId: 7 }, { productId: 102, categoryId: 30 },
            { productId: 103, categoryId: 4 }, { productId: 103, categoryId: 8 },
            { productId: 104, categoryId: 5 },
            { productId: 105, categoryId: 5 },
            { productId: 106, categoryId: 6 },
            { productId: 107, categoryId: 18 },
            { productId: 108, categoryId: 2 }, { productId: 108, categoryId: 12 },
            { productId: 109, categoryId: 3 }, { productId: 109, categoryId: 15 },
            { productId: 110, categoryId: 3 }, { productId: 110, categoryId: 16 },
            { productId: 111, categoryId: 3 }, { productId: 111, categoryId: 17 },
            { productId: 112, categoryId: 3 }, { productId: 112, categoryId: 45 },
            { productId: 113, categoryId: 3 }, { productId: 113, categoryId: 50 },
            { productId: 114, categoryId: 6 }, { productId: 114, categoryId: 4 }, { productId: 114, categoryId: 26 },
        );

        // ==================================================================================================
        // Генерируем оставшиеся 126 продуктов (140 - 14)
        // ==================================================================================================
        const START_PRODUCT_ID = 115; // Начинаем с ID, следующего за последним из ваших примеров
        const TOTAL_PRODUCTS_TO_GENERATE = 126; // 140 - 14 = 126

        // Допустимые ID для внешних ключей (вам нужно убедиться, что они существуют!)
        const styleIds = [1, 2, 3, 4, 5]; // Современный, Классический, Лофт, Скандинавский, Восточный
        const brandIds = [1, 2, 3, 4, 5]; // Мебель-Эксперт, КлассикХоум, Свет-Хаус, Уютный Дом, Восток-Декор
        const collectionIds = [1, 2, 3, 4, 5, 6]; // Уют, Антик, Индустриал, Сканди, Абстракция, Азия
        const countryIds = [1, 2, 3, 4, 5]; // Россия, Италия, Китай, Турция, Индия

        // Расширенный список category IDs для генерации
        const categoryIdsForGeneration = [
            4, 7, 8, 10, 30, // Гостиная
            5, // Спальня
            6, // Кухня
            18, // Детская
            2, 12, // Офис
            3, 15, 16, 17, 45, 50, // Декор, Освещение, Текстиль, Декор для стен, Зеркала, Декоративные фигурки
            26, // Обеденные группы
            // Добавьте сюда другие существующие Category ID, если они у вас есть
            // Например: 1, 9, 11, 13, 14, 19, 20, 21, 22, 23, 24, 25, 27, 28, 29...
        ];

        for (let i = 0; i < TOTAL_PRODUCTS_TO_GENERATE; i++) {
            const productId = START_PRODUCT_ID + i;
            const styleId = styleIds[i % styleIds.length];
            const brandId = brandIds[i % brandIds.length];
            const collectionId = collectionIds[i % collectionIds.length];
            const countryId = countryIds[i % countryIds.length];
            const isNew = Math.random() > 0.5; // Случайно 50/50
            const isActive = Math.random() > 0.1; // 90% активных

            const productName = `Продукт #${productId} - ${isNew ? 'Новинка' : 'Популярное'}`;
            const shortDesc = `Краткое описание для продукта ${productId}. Стиль: ${styleId}, Бренд: ${brandId}.`;
            const longDesc = `Полное описание для продукта ${productId}. Это универсальный предмет мебели, который идеально впишется в современный интерьер. Изготовлен из высококачественных материалов, обеспечивает долговечность и комфорт использования.`;
            const articul = `PROD-${String(productId).padStart(3, '0')}`;
            const sku = `SKU-${String(productId).padStart(3, '0')}-${String(styleId).padStart(2, '0')}`;

            productSeedDataToCreate.push({
                id: productId,
                styleId,
                brandId,
                collectionId,
                countryId,
                isActive,
                isNew,
                articul,
                sku,
                name: productName,
                descriptionShort: shortDesc,
                descriptionLong: longDesc,
                // image: `/images/products/generated_product_${productId}.jpg`, // Пример генерируемого пути
                // old_price: parseFloat((Math.random() * (100000 - 10000) + 10000).toFixed(2)),
                // new_price: parseFloat((Math.random() * (90000 - 9000) + 9000).toFixed(2)),
                // primary_color: Math.floor(Math.random() * 4) + 1, // Случайный цвет от 1 до 4
                // secondary_color: Math.floor(Math.random() * 4) + 1,
            });

            // Генерируем связи с категориями (каждый продукт будет иметь 1-3 категории)
            const numCategories = Math.floor(Math.random() * 3) + 1; // 1, 2 или 3 категории
            const assignedCategories = new Set<number>();
            while (assignedCategories.size < numCategories) {
                const randomCategoryIndex = Math.floor(Math.random() * categoryIdsForGeneration.length);
                assignedCategories.add(categoryIdsForGeneration[randomCategoryIndex]);
            }
            assignedCategories.forEach(catId => {
                productCategoryLinks.push({ productId, categoryId: catId });
            });
        }

        // Создаем записи продуктов в базе данных
        await ProductModel.bulkCreate(productSeedDataToCreate);
        console.log(`Продукты успешно добавлены в базу данных. Всего: ${productSeedDataToCreate.length} продуктов.`);

        // Создаем связи между продуктами и категориями
        await ProductCategoryModel.bulkCreate(productCategoryLinks);
        console.log(`Связи продуктов с категориями успешно добавлены. Всего: ${productCategoryLinks.length} связей.`);

    } catch (error) {
        console.error('Ошибка при заполнении таблицы продуктов или связей:', error);
    }
}