import React from 'react'
import HeaderButtons from '@/components/admin/HeaderButtons.tsx'
import { ProductModel, StyleModel } from '@/db/models'
import { BrandModel } from '@/db/models/brand.model'
import { CollectionModel } from '@/db/models/collection.model'
import { CountryModel } from '@/db/models/country.model'
import ProductFilterAndList from '@/components/admin/ProductFilterAndList'
import { NUMBER_OF_PRODUCTS_TO_FETCH } from '@/app/constants.ts'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Op } from 'sequelize'

export const metadata = {
    title: 'Decoro | Список продукции'
}

// Определяем тип для searchParams, чтобы TypeScript понимал структуру
interface ProductsManagementPageProps {
    searchParams: {
        brand?: string;
        collection?: string;
        country?: string;
        style?: string;
        articul?: string; // Для поиска по артикулу
        page?: string;    // Для текущей страницы пагинации
    };
}
const ProductsManagementPage = async ({ searchParams }: ProductsManagementPageProps) => {

    // 1. Извлечение и преобразование параметров из URL
    const currentPage = parseInt(searchParams.page || '1', 10) // Текущая страница, по умолчанию 1
    const itemsPerPage = NUMBER_OF_PRODUCTS_TO_FETCH

    const brandId = searchParams.brand ? parseInt(searchParams.brand, 10) : undefined
    const collectionId = searchParams.collection ? parseInt(searchParams.collection, 10) : undefined
    const countryId = searchParams.country ? parseInt(searchParams.country, 10) : undefined
    const styleId = searchParams.style ? parseInt(searchParams.style, 10) : undefined
    const articulFilter = searchParams.articul || undefined

    console.log('searchParams:', searchParams);
    console.log('brandId:', brandId, typeof brandId);
    console.log('collectionId:', collectionId, typeof collectionId);
    console.log('countryId:', countryId, typeof countryId);
    console.log('styleId:', styleId, typeof styleId);
    console.log('articulFilter:', articulFilter, typeof articulFilter);
    console.log('currentPage:', currentPage, typeof currentPage);

    // 2. Формирование объекта WHERE для Sequelize
    const whereClause: any = {}; // Создаем пустой объект для условий

    if (brandId) {
        whereClause.brandId = brandId;
    }
    if (collectionId) {
        whereClause.collectionId = collectionId;
    }
    if (countryId) {
        whereClause.countryId = countryId;
    }
    if (styleId) {
        whereClause.styleId = styleId;
    }
    if (articulFilter) {
        // Для поиска по части строки используем Op.like (регистронезависимый поиск, если БД настроена)
        whereClause.articul = { [Op.iLike]: `%${articulFilter}%` }; // Op.iLike для PostgreSQL, Op.like для MySQL/SQLite
    }

    //без учета limit/offset.
        const { count: totalProductsCount, rows: products } = await ProductModel.findAndCountAll({
        where: whereClause, // Применяем динамически сформированные условия
        order: [['updatedAt', 'DESC']],
        limit: itemsPerPage, // Количество записей на текущую страницу
        offset: (currentPage - 1) * itemsPerPage, // Смещение для текущей страницы
    }).then(result => ({
        count: result.count,
        rows: result.rows.map(p => p.toJSON()) // Преобразуем в JSON
    }));

    console.log('Fetched products count (for current page):', products.length);
    console.log('Total filtered products count:', totalProductsCount);


    // 4. Загружаем справочные данные для фильтров (они не зависят от searchParams)
    const brands = await BrandModel.findAll().then(data => data.map(b => b.toJSON()));
    const collections = await CollectionModel.findAll().then(data => data.map(col => col.toJSON()));
    const countries = await CountryModel.findAll().then(data => data.map(c => c.toJSON()));
    const styles = await StyleModel.findAll().then(data => data.map(s => s.toJSON()));


    async function removeProduct(id: number) {
        'use server'
        await ProductModel.destroy({ where: { id } })
        revalidatePath('/admin/products')
        // redirect('/admin/products')
    }

    return (<>
        <h1 className='flex flex-col text-[#505050] font-bold text-2xl justify-center items-center mt-2'> Управление товарными позициями </h1>
        <div className='flex flex-col justify-between items-center mt-2'>
            <HeaderButtons/>

            <ProductFilterAndList
                products={products} // Уже отфильтрованные и пагинированные продукты
                initialBrands={brands}
                initialCollections={collections}
                initialCountries={countries}
                initialStyles={styles}
                removeProduct={removeProduct}
                itemsPerPage={itemsPerPage}
                totalProductsCount={totalProductsCount} // Передаем общее количество отфильтрованных продуктов
                currentPage={currentPage} // Передаем текущую страницу
            />
        </div>
    </>)
}

export default ProductsManagementPage