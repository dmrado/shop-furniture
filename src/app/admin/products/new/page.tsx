import Link from 'next/link'
import { getServerSession } from 'next-auth'
import React from 'react'
import ProductForm from '@/components/admin/ProductForm.tsx'
import { isAdmin } from '@/app/isAdmin.ts'
import { isSessionExpired } from '@/app/isSessionExpired.ts'
import { redirect } from 'next/navigation'
import ProductVariantForm from "@/components/admin/ProductVariantForm";

const AddPost = async () => {
    const session = await getServerSession()

    // if (!session || !isAdmin(session) || isSessionExpired(session)) {
    //     return redirect('/api/auth/signin')
    // }

    return (<>
        <div className="flex justify-center">
            <h1 className="mt-6 pb-2">Ввод товарной позиции</h1>
        </div>

        <div className="items-center p-5">
            <ProductForm/>
            <div className="flex justify-center p-10">
                <Link href={'/admin'}>
                    <button className='button_blue'>Вернуться</button>
                </Link>
            </div>
        </div>
    </>)
}

export default AddPost
