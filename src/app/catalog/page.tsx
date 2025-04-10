import CategoryScroll from '@/components/site/CategoryScroll'
import { getCategoryChildren } from '@/actions/categoryActions'
import CategoryNavigation from '@/components/site/CategoryNavigation'
import Breadcrumbs from '@/components/site/Breadcrumbs'
import Link from 'next/link'

type Props = {
    searchParams: Record<'page' | 'itemsPerPage', string | string[] | undefined>
}

const CatalogPage = async ({ searchParams }: Props) => {

    // Получаем полное дерево категорий
    const rootCategories = await getCategoryChildren()
    console.log('new rootCategories from catalog page', rootCategories)

    const page = Number(searchParams?.page) || 1

    return <>
        <div className="p-4">
            <Breadcrumbs categories={rootCategories}/>
            {/*<CategoryNavigation categories={rootCategories}/>*/}
        </div>
        <div className="flex px-4 text-center justify-center text-3xl font-medium items-center mt-16">
            <h1>Каталог элитной мебели и декора</h1>
        </div>

        <div className="container mx-auto px-4">
            <ul>
                {/* Отображение основных категорий и их подкатегорий */}
                {!!rootCategories && rootCategories.map(rootCategory =>
                    <li key={rootCategory.id}>
                        <div className="container mx-auto my-8">
                            <div className="flex p-4 flex-row items-center mb-6">
                                <div className="text-3xl font-medium">
                                    <Link href={`/catalog/${rootCategory.slug}`}>
                                        <h3 className="">
                                            {rootCategory.name}
                                        </h3>
                                    </Link>
                                </div>
                            </div>

                            {rootCategory.children && rootCategory.children.length > 0 && (
                                <CategoryScroll categories={rootCategory.children}/>
                            )}

                        </div>

                    </li>)}
            </ul>
        </div>

    </>
}
export default CatalogPage
