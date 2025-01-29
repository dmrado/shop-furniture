import ProductFullDescription from "@/components/site/ProductFullDescription"
import { getProductBiId } from "@/actions/productActions"
import {notFound} from "next/navigation"

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const ProductPage = async ({params}: Props) => {
//todo разобрать params или searchParams 
    const id = Number(params.id)
    if (isNaN(id)) {
        return notFound()
    }
    console.log('params', params)

    const product = await getProductBiId(id)

    if (!product) {
        return notFound()
    }

    return <>
        <ProductFullDescription product={product}/>
    </>
}

export default ProductPage
