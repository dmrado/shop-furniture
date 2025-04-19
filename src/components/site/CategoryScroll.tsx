'use client'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import ProductCategory from '@/components/site/ProductCategory'
import { CategoryModel } from '@/db/models/category.model'
// import { getCategories } from '@/actions/categoryActions'

//*todo требуется сделать этот компонент динамичной оберткой для каждой категории и вообще для сайта

const CategoryScroll = ({ categories }: { categories: CategoryModel[] }) => {
    // const [ offset, setOffset ] = useState(8)
    // const [ count, setCount ] = useState(0)
    // const [ categories, setCategories ] = useState<CategoryModel[]>(categories)
    // const { ref, inView } = useInView()

    // const loadMoreCategories = async () => {
    //     //todo в пропсах приходят старые продукты а здесь тащим еще из БД и сливаем два массива, но у нас в пропсах приходят сразу ВСЕ продукты и все это переписать на категории их будет не много так что не надо офсетить и лимитить, а если будет много то сенрверным экшеном здесь добирать еще из БД и далее сливать массивы
    //     const { categories: newCategories, count } = await getCategories(offset)
    //     setCategories([ ...categories, ...newCategories ])
    //     setOffset(offset + 8)
    //     setCount(count)
    // }
    //
    // useEffect(() => {
    //     if (inView && categories.length !== count) {
    //         loadMoreCategories()
    //         //todo обработать ошибку
    //     }
    // }, [ inView ])

    return (
        <div className="h-[450px] overflow-auto hide-scrollbar grid p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">

            {/*todo добавить модель категорий привязку один-ко-многим к модели продуктов и обращаться к ней и как-то переделать grandCategory*/}

            {categories.length
                ? categories.map(category => (
                    <div className="h-[200px] mb-2" key={category.id}>
                        {/* Передаем категорию первого уровня и её дочерние категории (второго уровня) */}
                        <ProductCategory category={category}/>
                    </div>
                ))
                : <div className='flex justify-center my-6 text-red-700'>
                    {/*{categories.length !== count ? 'Загружаем еще...' : 'Простите, это весь список.'}*/}
                    <p>В этой категории нет подкатегорий (дебаг)</p>
                </div>
            }
        </div>
    )
}
export default CategoryScroll