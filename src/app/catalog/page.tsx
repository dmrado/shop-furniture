import ReactPaginateWrapper from '@/components/site/ReactPaginateWrapper'
import {getProducts} from '@/actions/productActions'
import ProductCategory from '@/components/site/ProductCategory'
import React from 'react'
import Breadcrumbs from '@/components/site/Breadcrumbs'
import InfinityScroll from '@/components/site/InfinityScroll'
import {getCategories, getFullCategoryTree, getMainCategories} from '@/actions/categoryActions'
import Link from "next/link";
import CategoryNavigation from "@/components/site/CategoryNavigation";

type Props = {
    params: { slug?: string[] },
    searchParams: Record<'page' | 'itemsPerPage', string | string[] | undefined>
}

const CatalogPage = async ({params, searchParams}: Props) => {

    // Получаем полное дерево категорий
    const categoryTree = await getFullCategoryTree();
    console.log('new categoryTree from catalog page', categoryTree);

    const page = Number(searchParams?.page) || 1

    // const limitMainCategories = 10
    // const offsetMainCategories = (page - 1) * limitMainCategories
    //
    // const {countMainCategories, mainCategories} = await getMainCategories(offsetMainCategories, limitMainCategories)
    // console.log('mainCategories from catalog page', mainCategories)
    // console.log('countMainCategories', countMainCategories)
    //
    // // Получаем все категории для отображения подкатегорий
    // const limit = 1000
    // const offset = (page - 1) * limit
    //
    // const {count, categories} = await getCategories(offset)
    // console.log('categories from catalog page', categories)
    // console.log('count', count)
    //
    // // Находим подкатегории для каждой главной категории
    // const mainCategoriesWithSubcategories = mainCategories.map(mainCategory => {
    //     const subcategories = categories.filter(category =>
    //         category.parentId === mainCategory.id
    //     );
    //
    //     return {
    //         ...mainCategory,
    //         subcategories
    //     };
    // });
    //
    // const totalPages = Math.ceil(count / limit)

    // Получаем ID категории из параметров (если есть)
    const categoryId = params?.categoryId ? Number(params.categoryId) : null;

    // Если есть ID категории, находим путь к ней
    let activePath = null;
    if (categoryId) {
        // Функция для поиска пути к категории по её ID
        function findCategoryPath(categories, targetId, path = []) {
            if (!categories) return null;
            for (const category of categories) {
                const newPath = [...path, category];
                if (category.id === targetId) {
                    return newPath;
                }
                if (category.children) {
                    const result = findCategoryPath(category.children, targetId, newPath);
                    if (result) return result;
                }
            }
            return null;
        }
        activePath = findCategoryPath(categoryTree, categoryId);
    }


    return <>
        <div className="p-4">
            <Breadcrumbs categories={categoryTree} activePath={activePath}/>
            {/*<CategoryNavigation categories={categoryTree}/>*/}
        </div>
        <div className="flex px-4 text-center justify-center text-3xl font-medium items-center mt-16">
            <h1>Каталог элитной мебели и декора</h1>
        </div>

        <div className="container mx-auto px-4">
            <ul>
                {/* Отображение основных категорий и их подкатегорий */}
                {!!categoryTree && categoryTree.map(mainCategory =>
                    <li key={mainCategory.id}>
                        <div className="container mx-auto my-8">
                            <div className="flex p-4 flex-row items-center mb-6">
                                <div className="text-3xl font-medium">
                                    <h1>{mainCategory.name}</h1>
                                </div>
                            </div>

                            {mainCategory.children && mainCategory.children.length > 0 && (
                                <InfinityScroll initialItems={mainCategory.children}/>
                            )}

                        </div>

                    </li>)}
            </ul>
        </div>

    </>
}
export default CatalogPage



