import { getAllCountries } from '@/actions/dictionaryActions'
import CountryManager from '@/components/admin/CountryManager'
import Title from '@/components/site/Title'
import { NUMBER_OF_PRODUCTS_TO_FETCH } from '@/app/constants'

const CountriesManagementPage = async ({ searchParams }) => {
    const currentPage = parseInt(searchParams.page || '1', 10)
    const itemsPerPage = NUMBER_OF_PRODUCTS_TO_FETCH

    // TODO: Добавить пагинацию в getCountries
    const countries = await getAllCountries()

    return <>
        <Title title="Управление странами" />
        <CountryManager
            initialCountries={countries}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            // TODO: Передать totalCount для пагинации
            totalCount={countries.length}
        />
    </>
}

export default CountriesManagementPage