import ProductFullDescription from "@/components/site/ProductFullDescription";
// import { getProductBiId } from "@/actions/productActions";
import { ProductModel } from '@/db/models'

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const ProductPage = async ({params, searchParams }: Props) => {
//todo разобрать params или searchParams 
    const id = Number(params.id)
    console.log('params.id', params.id)
    console.log('searchParams.id', searchParams.id)

    const product = await ProductModel.findByPk(id)
    // const productPlain = product.toJSON()

  return <>
      <ProductFullDescription product={product}/>
    </>
}

export default ProductPage;
