import React from 'react'
import HeaderButtons from '@/components/admin/HeaderButtons.tsx'
import { ProductModel } from '@/db/models/product.model'
import { BrandModel } from '@/db/models/brand.model'
import { CollectionModel } from '@/db/models/collection.model'
import { CountryModel } from '@/db/models/country.model'
import { StyleModel } from '@/db/models/style.model'
import ProductFilterAndList from '@/components/admin/ProductFilterAndList'
import { NUMBER_OF_PRODUCTS_TO_FETCH } from '@/app/constants.ts'
import { revalidatePath } from 'next/cache'
import { DictionaryItem } from '@/db/types/common-types'
import { getProductList } from '@/actions/searchProduct'
import {getBrands, getCollections, getCountries, getStyles} from "@/actions/dictionaryActions";

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
        name?: string; // Для поиска по названию продукта
        articul?: string; // Для поиска по артикулу как артикулу продукта, так и артикулу варианта
        page?: string; // Для текущей страницы пагинации
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

    // Извлекаем поисковые запросы
    const nameQuery = searchParams.name || undefined // Получаем запрос по названию
    const articulQuery = searchParams.articul || undefined // Получаем запрос по артикулу

    const { products, totalCount: totalProductsCount } = await getProductList(
        currentPage,
        itemsPerPage,
        {
            brandId,
            collectionId,
            countryId,
            styleId,
            nameQuery,
            articulQuery,
        }
    )

    const brands = await getBrands()
    const collections = await getCollections()
    const countries = await getCountries()
    const styles = await getStyles()

    async function removeProduct(id: number) {
        'use server'
        await ProductModel.destroy({ where: { id } })
        revalidatePath('/admin/products')
        // redirect('/admin/products')
    }

    return (<>
        <h1 className='flex text-[#505050] font-bold text-2xl justify-center items-center mt-2 px-8'> Управление
            товарными позициями </h1>
        <div className='flex flex-col justify-between items-center'>
            <HeaderButtons/>

            <ProductFilterAndList
                products={products} // Уже отфильтрованные и пагинированные продукты, полученные от getProductList
                initialBrands={brands}
                initialCollections={collections}
                initialCountries={countries}
                initialStyles={styles}
                removeProduct={removeProduct}
                itemsPerPage={NUMBER_OF_PRODUCTS_TO_FETCH}
                totalProductsCount={totalProductsCount} // Передаем общее количество отфильтрованных продуктов
                currentPage={currentPage} // Передаем текущую страницу
            />
        </div>
    </>)
}

export default ProductsManagementPage