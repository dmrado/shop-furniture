import { getAllCollections } from '@/actions/dictionaryActions'
import CollectionManager from '@/components/admin/CollectionManager'
import Title from '@/components/site/Title'
import { NUMBER_OF_PRODUCTS_TO_FETCH } from '@/app/constants'

const CollectionsManagementPage = async ({ searchParams }) => {
    const currentPage = parseInt(searchParams.page || '1', 10)
    const itemsPerPage = NUMBER_OF_PRODUCTS_TO_FETCH

    // TODO: Добавить пагинацию в getCollections, чтобы не загружать все данные
    const collections = await getAllCollections()

    return (
        <>
            <Title title="Управление коллекциями" />
            <CollectionManager
                initialCollections={collections}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                // TODO: Передать totalCount для пагинации
                totalCount={collections.length}
            />
        </>
    )
}

export default CollectionsManagementPage
