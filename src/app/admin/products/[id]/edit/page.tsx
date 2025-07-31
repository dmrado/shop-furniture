export {}
// import { notFound, redirect } from 'next/navigation'
// import { Post } from '@/db/modeladmin/post.model.ts'
// import Link from 'next/link'
// import React from 'react'
// import { getServerSession } from 'next-auth'
// import { isAdmin } from '@/actions/isAdmin.ts'
// import { isSessionExpired } from '@/actions/isSessionExpired.ts'
// import PostForm from '@/components/admin/ProductForm.tsx'
// import ProductForm from '@/components/admin/ProductForm.tsx'
// import { ProductModel } from '@/db/models'
// // import '../tailwind.css'
//
// type PostPageParams = { params: { id: number } }
//
// const EditPost = async ({ params }: PostPageParams) => {
//     const session = await getServerSession()
//     // if (!session || !isAdmin(session) || isSessionExpired(session)) {
//     //     return redirect('/api/auth/signin')
//     // }
//
//     const product = await ProductModel.findByPk(params.id)
//     if (!product) {
//         return notFound()
//     }
//
//     return <>
//
//         <div className="flex justify-center">
//             <h1 className="p-5">Редактирование продукта</h1>
//         </div>
//         <div
//             className="flex justify-center">
//             <img src={product.path ? product.path : '/svet.png'}
//                 alt="Картинка продукта"
//                 className="max-w-xl rounded-md"
//             />
//         </div>
//
//         <div className="items-center p-5">
//             <ProductForm product={product}/>
//             <div className="flex justify-center p-10">
//                 <Link href={'/admin'}>
//                     <button className='button_blue'>Вернуться</button>
//                 </Link>
//             </div>
//         </div>
//     </>
// }
//
// export default EditPost
