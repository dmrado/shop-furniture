import ReactPaginateWrapper from '@/components/site/ReactPaginateWrapper'
import {getProducts} from '@/actions/productActions'
import ProductCategory from '@/components/site/ProductCategory'
import React from "react";

type Props = {
    searchParams: Record<'page' | 'itemsPerPage', string | string[] | undefined>
}

const CatalogPage = async ({searchParams}: Props) => {
    const page = Number(searchParams?.page) || 1
    const limit = 7
    const offset = (page - 1) * limit

    //todo удалить после создания модели CategoryModel оставлено для верстки
    const {count, products} = await getProducts(offset, limit)

    //todo раскомментировать после создания модели CategoryModel
    // const {count, categories} = await getCategory(offset, limit)

    const totalPages = Math.ceil(count / limit)

    //todo создать запрос к модели Грандкатегорий
    return <>
        {/*{!!grandCategories && grandCategories.map(grandCategory => <li key=>{grandCategory.id}*/}

            <div className="container mx-auto my-20">
                <div className="flex flex-row items-center mb-6">
                    <div className="text-3xl font-medium">
                        <h1>Мебель</h1>
                        {/*<h1>{grandCategory.name}</h1>*/}
                    </div>
                    {/*<div className="text-xl justify-center">*/}
                    {/*    <ReactPaginateWrapper pages={totalPages} currentPage={page} />*/}
                    {/*</div>*/}
                </div>

                <div
                    className="grid p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 scrollbar-hide">
                    {/*todo требуется map продуктов по категориям для этого добавить модель категорий с привязкой один-ко-многим к модели продуктов и обращаться к ней*/}
                    {/*{category.length*/}
                    {/*    ? categories.map(category => (*/}
                    {/*        <ProductCategory category={category} key={category.id}/>))*/}
                    {/*    : <p>Категории из каталога не найдены? </p>*/}
                    {/*}*/}
                    {products.length
                        ? products.map(product => (
                            <div className="h-[200px] mb-2" key={product.id}>
                                <ProductCategory product={product}/>
                            </div>
                        ))
                        : <p>Продукты - Категории не найдены</p>
                    }
                </div>
            </div>
        {/*</li>*/}
        )}
    </>
}

export default CatalogPage