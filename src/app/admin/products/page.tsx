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

export const metadata = {
    title: 'Decoro | Список продукции'
}

const ProductsManagementPage = async ({ searchParams }) => {

    const { brand } = await searchParams
    console.log('brand' , brand , typeof brand)

    const products = await ProductModel.findAll({
        order: [ [ 'updatedAt', 'DESC' ] ],
        where: { brandId: brand,  }
    })
        .then(data => data.map(p => p.toJSON()))

    // Загружаем справочные данные для фильтров
    const brands = await BrandModel.findAll()
    const collections = await CollectionModel.findAll()
    const countries = await CountryModel.findAll()
    const styles = await StyleModel.findAll()

    // Преобразуем в JSON для передачи на клиентскую сторону
    // const initialProducts = products.map(p => p.toJSON())
    const initialBrands = brands.map(b => b.toJSON())
    const initialCollections = collections.map(col => col.toJSON())
    const initialCountries = countries.map(c => c.toJSON())
    const initialStyles = styles.map(s => s.toJSON())

    async function removeProduct(id: number) {
        'use server'
        await ProductModel.destroy({ where: { id } })
        revalidatePath('/admin/products')
        redirect('/admin/products')
    }

    return (<>
        <h1 className='flex flex-col text-[#505050] font-bold text-2xl justify-center items-center mt-2'> Управление товарными позициями </h1>
        <div className='flex flex-col justify-between items-center mt-2'>
            <HeaderButtons/>

            <ProductFilterAndList
                products={products}
                initialBrands={initialBrands}
                initialCollections={initialCollections}
                initialCountries={initialCountries}
                initialStyles={initialStyles}
                removeProduct={removeProduct}
                itemsPerPage={NUMBER_OF_PRODUCTS_TO_FETCH}
            />
        </div>
    </>)
}

export default ProductsManagementPage