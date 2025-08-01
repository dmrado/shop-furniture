import { getBrands } from '@/actions/dictionaryActions'
import { BrandModel } from '@/db/models'
import { revalidatePath } from 'next/cache'

import BrandManager from '@/components/admin/BrandManager'
import Title from '@/components/site/Title'
import {NUMBER_OF_PRODUCTS_TO_FETCH} from "@/app/constants";

async function removeBrand(id: number) {
    'use server'
    await BrandModel.destroy({ where: { id } })
    revalidatePath('/admin/brands')
    // redirect('/admin/products')
}
const BrandsManagementPage = async ({}) => {



    const brands = await getBrands()

    return <>
        <Title title="Управление брендами" />
        <BrandManager
            initialBrands={brands}
            removeBrand={removeBrand} // Передаем Server Action как пропс

        />
    </>

}
export default BrandsManagementPage