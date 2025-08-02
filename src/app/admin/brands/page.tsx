import { getBrands } from '@/actions/dictionaryActions'
import { BrandModel } from '@/db/models'
import { revalidatePath } from 'next/cache'

import BrandManager from '@/components/admin/BrandManager'
import Title from '@/components/site/Title'
import { NUMBER_OF_PRODUCTS_TO_FETCH } from '@/app/constants'

const BrandsManagementPage = async ({ searchParams }) => {

    const currentPage = parseInt(searchParams.page || '1', 10) // Текущая страница, по умолчанию 1
    const itemsPerPage = NUMBER_OF_PRODUCTS_TO_FETCH

    const brands = await getBrands()

    return <>
        <Title title="Управление брендами" />
        <BrandManager
            initialBrands={brands}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
        />
    </>

}
export default BrandsManagementPage