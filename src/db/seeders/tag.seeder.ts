import { TagModel } from "@/db/models/tag.model";
export const seedTags = async () => {
    try {
      // Родительские категории
      const parentTags = [
        { name: 'Популярные', slug: 'populyarnye' },
        { name: 'По стилю', slug: 'po-stilyu' },
        { name: 'По дизайну', slug: 'po-dizaynu' },
        { name: 'По материалу', slug: 'po-materialu' },
        { name: 'По цвету', slug: 'po-tsvetu' },
        { name: 'По форме', slug: 'po-forme' },
        { name: 'Производитель', slug: 'proizvoditel' },
      ];
  
      // Создаем родительские теги
      for (const tag of parentTags) {
        await TagModel.findOrCreate({
          where: { slug: tag.slug },
          defaults: {
            name: tag.name,
            slug: tag.slug,
            parentId: null
          }
        });
      }
  
      // Примеры подкатегорий для некоторых родительских тегов
      // Получаем ID родительских тегов
      const populyarnyeTag = await TagModel.findOne({ where: { slug: 'populyarnye' } });
      const styleTag = await TagModel.findOne({ where: { slug: 'po-stilyu' } });
      const designTag = await TagModel.findOne({ where: { slug: 'po-dizaynu' } });
      const materialTag = await TagModel.findOne({ where: { slug: 'po-materialu' } });
      const colorTag = await TagModel.findOne({ where: { slug: 'po-tsvetu' } });
      const formTag = await TagModel.findOne({ where: { slug: 'po-forme' } });
      const manufacturerTag = await TagModel.findOne({ where: { slug: 'proizvoditel' } });
  
     // Подкатегории для "Поопулярные"
     if (populyarnyeTag) {
      const populyarnyeSubcategories = [
        { name: 'Классические', slug: 'klassicheskie' },
        { name: 'Современные', slug: 'sovremennye' },
        { name: 'Угловые', slug: 'uglovye' },
        { name: 'Мягкие', slug: 'myagkie' },
        { name: 'Модульные', slug: 'modulnye' },
        { name: 'Прямые', slug: 'pryamye' },
        { name: 'Раскладные', slug: 'raskladnye' },
      ];

      for (const subTag of populyarnyeSubcategories) {
        await TagModel.findOrCreate({
          where: { slug: subTag.slug },
          defaults: {
            name: subTag.name,
            slug: subTag.slug,
            parentId: populyarnyeTag.id
          }
        });
      }
    }

      // Подкатегории для "По стилю"
      if (styleTag) {
        const styleSubcategories = [
          { name: 'Скандинавский', slug: 'skandinavskiy-stil' },
          { name: 'Лофт', slug: 'loft-stil' },
          { name: 'Минимализм', slug: 'minimalizm' },
          { name: 'Классический', slug: 'klassicheskiy-stil' }
        ];
  
        for (const subTag of styleSubcategories) {
          await TagModel.findOrCreate({
            where: { slug: subTag.slug },
            defaults: {
              name: subTag.name,
              slug: subTag.slug,
              parentId: styleTag.id
            }
          });
        }
      }
  
      // Подкатегории для "По дизайну"
      if (designTag) {
        const styleSubcategories = [
          { name: 'Дизайнерская', slug: 'design-made' },
          { name: 'Ручная работа', slug: 'hand-made' },
        ];
  
        for (const subTag of styleSubcategories) {
          await TagModel.findOrCreate({
            where: { slug: subTag.slug },
            defaults: {
              name: subTag.name,
              slug: subTag.slug,
              parentId: designTag.id
            }
          });
        }
      }

      // Подкатегории для "По материалу"
      if (materialTag) {
        const materialSubcategories = [
          { name: 'Кожа', slug: 'kozha' },
          { name: 'Ткань', slug: 'tkan' },
          { name: 'Дерево', slug: 'derevo' },
          { name: 'Металл', slug: 'metall' },
          { name: 'Экокожа', slug: 'ekokozha' }
        ];
  
        for (const subTag of materialSubcategories) {
          await TagModel.findOrCreate({
            where: { slug: subTag.slug },
            defaults: {
              name: subTag.name,
              slug: subTag.slug,
              parentId: materialTag.id
            }
          });
        }
      }
  
      // Подкатегории для "По цвету"
      if (colorTag) {
        const colorSubcategories = [
          { name: 'Белый', slug: 'belyy' },
          { name: 'Чёрный', slug: 'chernyy' },
          { name: 'Серый', slug: 'seryy' },
          { name: 'Бежевый', slug: 'bezhevyy' },
          { name: 'Коричневый', slug: 'korichnevyy' },
          { name: 'Синий', slug: 'siniy' }
        ];
  
        for (const subTag of colorSubcategories) {
          await TagModel.findOrCreate({
            where: { slug: subTag.slug },
            defaults: {
              name: subTag.name,
              slug: subTag.slug,
              parentId: colorTag.id
            }
          });
        }
      }
  
      // Подкатегории для "По форме"
      if (formTag) {
        const formSubcategories = [
          { name: 'Круглая', slug: 'kruglaya' },
          { name: 'Квадратная', slug: 'kvadratnaya' },
          { name: 'П-образная', slug: 'p-obraznaya' },
          { name: 'Г-образная', slug: 'g-obraznaya' }
        ];
  
        for (const subTag of formSubcategories) {
          await TagModel.findOrCreate({
            where: { slug: subTag.slug },
            defaults: {
              name: subTag.name,
              slug: subTag.slug,
              parentId: formTag.id
            }
          });
        }
      }
  
      // Подкатегории для "Производитель"
      if (manufacturerTag) {
        const manufacturers = [
          { name: 'ИКЕА', slug: 'ikea' },
          { name: 'Хофф', slug: 'hoff' },
          { name: 'Много Мебели', slug: 'mnogo-mebeli' },
          { name: 'Лазурит', slug: 'lazurit' },
          { name: 'Мебель Шара', slug: 'mebel-shara' }
        ];
  
        for (const subTag of manufacturers) {
          await TagModel.findOrCreate({
            where: { slug: subTag.slug },
            defaults: {
              name: subTag.name,
              slug: subTag.slug,
              parentId: manufacturerTag.id
            }
          });
        }
      }
  
      console.log('Теги успешно добавлены в базу данных');
    } catch (error) {
      console.error('Ошибка при добавлении тегов:', error);
    }
  };



// import { Sequelize } from 'sequelize';
// import { TagModel } from '../models/tag.model';

// export async function seedTags(sequelize: Sequelize) {
//   try {
//     // Очистка таблицы перед заполнением (опционально)
//     await TagModel.destroy({ where: {}, truncate: { cascade: true } });

//     // Создание родительских тегов (категорий первого уровня)
//     const parentTags = await TagModel.bulkCreate([
//       { name: 'Электроника', slug: 'electronics', parentId: null },
//       { name: 'Одежда', slug: 'clothing', parentId: null },
//       { name: 'Дом и сад', slug: 'home-garden', parentId: null },
//       { name: 'Спорт и отдых', slug: 'sports-leisure', parentId: null },
//       { name: 'Красота и здоровье', slug: 'beauty-health', parentId: null },
//     ]);

//     // Получение ID созданных родительских тегов
//     const electronicsId = parentTags[0].id;
//     const clothingId = parentTags[1].id;
//     const homeGardenId = parentTags[2].id;
//     const sportsLeisureId = parentTags[3].id;
//     const beautyHealthId = parentTags[4].id;

//     // Создание дочерних тегов (категорий второго уровня)
//     await TagModel.bulkCreate([
//       // Электроника
//       { name: 'Смартфоны', slug: 'smartphones', parentId: electronicsId },
//       { name: 'Ноутбуки', slug: 'laptops', parentId: electronicsId },
//       { name: 'Планшеты', slug: 'tablets', parentId: electronicsId },
//       { name: 'Аудиотехника', slug: 'audio', parentId: electronicsId },
//       { name: 'Фототехника', slug: 'photo', parentId: electronicsId },
      
//       // Одежда
//       { name: 'Мужская одежда', slug: 'mens-clothing', parentId: clothingId },
//       { name: 'Женская одежда', slug: 'womens-clothing', parentId: clothingId },
//       { name: 'Детская одежда', slug: 'kids-clothing', parentId: clothingId },
//       { name: 'Обувь', slug: 'footwear', parentId: clothingId },
//       { name: 'Аксессуары', slug: 'accessories', parentId: clothingId },
      
//       // Дом и сад
//       { name: 'Мебель', slug: 'furniture', parentId: homeGardenId },
//       { name: 'Кухонные принадлежности', slug: 'kitchen', parentId: homeGardenId },
//       { name: 'Садовый инвентарь', slug: 'garden-tools', parentId: homeGardenId },
//       { name: 'Освещение', slug: 'lighting', parentId: homeGardenId },
//       { name: 'Декор', slug: 'decor', parentId: homeGardenId },
      
//       // Спорт и отдых
//       { name: 'Фитнес', slug: 'fitness', parentId: sportsLeisureId },
//       { name: 'Туризм', slug: 'tourism', parentId: sportsLeisureId },
//       { name: 'Велосипеды', slug: 'bicycles', parentId: sportsLeisureId },
//       { name: 'Спортивная одежда', slug: 'sportswear', parentId: sportsLeisureId },
//       { name: 'Спортивный инвентарь', slug: 'sports-equipment', parentId: sportsLeisureId },
      
//       // Красота и здоровье
//       { name: 'Уход за кожей', slug: 'skin-care', parentId: beautyHealthId },
//       { name: 'Уход за волосами', slug: 'hair-care', parentId: beautyHealthId },
//       { name: 'Макияж', slug: 'makeup', parentId: beautyHealthId },
//       { name: 'Парфюмерия', slug: 'perfume', parentId: beautyHealthId },
//       { name: 'Витамины и БАДы', slug: 'vitamins', parentId: beautyHealthId },
//     ]);

//     console.log('Теги успешно созданы');
//   } catch (error) {
//     console.error('Ошибка при создании тегов:', error);
//     throw error;
//   }
// }

// // Пример использования сидера
// // import { sequelize } from '../config/database';
// // seedTags(sequelize).then(() => console.log('Сидер тегов выполнен'));
