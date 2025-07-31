import UrlParamsSelect from '@/components/ui/UrlParamsSelect'
import { DictionaryItem } from '@/db/types/common-types'

type Props = {
    brands: DictionaryItem[]
    collections: DictionaryItem[]
    countries: DictionaryItem[]
    styles: DictionaryItem[]
}

const AdminFilter = ({ brands, collections, countries, styles }: Props) => {
    return (<>

        <UrlParamsSelect
            label={'Бренд'}
            options={brands.map((brand) => ({
                value: String(brand.id),
                label: brand.name
            }))}
            queryKey={'brand'}
            placeHolder={'Все бренды'}
        />

        <UrlParamsSelect
            label={'Коллекция'}
            options={collections.map((brand) => ({
                value: String(brand.id),
                label: brand.name
            }))}
            queryKey={'collection'}
            placeHolder={'Все коллекции'}
        />

        <UrlParamsSelect
            label={'Страна'}
            options={countries.map((brand) => ({
                value: String(brand.id),
                label: brand.name
            }))}
            queryKey={'country'}
            placeHolder={'Все страны'}
        />

        <UrlParamsSelect
            label={'Стиль'}
            options={styles.map((brand) => ({
                value: String(brand.id),
                label: brand.name
            }))}
            queryKey={'style'}
            placeHolder={'Все стили'}
        />
    </>)
}

export default AdminFilter