import React from 'react'
import type { Metadata } from 'next'
import SideBar from '@/components/site/SideBar'
import Title from '@/components/site/Title'
import Breadcrumbs from '@/components/site/Breadcrumbs'

export const metadata: Metadata = {
    title: 'Каталог товаров - Decoro',
    description: 'Каталог мебели и товаров для дома',
}

// Next.js автоматически передает объект params
export default function CatalogLayout({ children, params }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="container mx-auto px-4 py-8">
            {/*<Breadcrumbs/>*/}
            <Title params={params}/>
            {/*<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">*/}
            {/*    /!* Боковое меню - 1/5 на больших экранах *!/*/}
            {/*    <div className="md:col-span-1">*/}
            {/*        <SideBar />*/}
            {/*    </div>*/}

            {/* Контент с карточками товаров - 4/5 на больших экранах */}
            {/*<div className="md:col-span-2 lg:col-span-4">*/}
            {children}
            {/*</div>*/}
            {/*</div>*/}
        </div>
    )
}
