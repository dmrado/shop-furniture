import { getAllStyles } from '@/actions/dictionaryActions'
import StyleManager from '@/components/admin/StyleManager'
import Title from '@/components/site/Title'
import { NUMBER_OF_PRODUCTS_TO_FETCH } from '@/app/constants'

const StylesManagementPage = async ({ searchParams }) => {
    const currentPage = parseInt(searchParams.page || '1', 10)
    const itemsPerPage = NUMBER_OF_PRODUCTS_TO_FETCH

    // TODO: Добавить пагинацию в getStyles
    const styles = await getAllStyles()

    return (
        <>
            <Title title="Управление стилями" />
            <StyleManager
                initialStyles={styles}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                // TODO: Передать totalCount для пагинации
                totalCount={styles.length}
            />
        </>
    )
}

export default StylesManagementPage
