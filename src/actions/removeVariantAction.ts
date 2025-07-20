'use server'
import { ProductVariantModel } from '@/db/models'
import { revalidatePath } from 'next/cache'

export async function removeVariant(id: number, productId: number) { // Добавляем productId для ревалидации
    await ProductVariantModel.destroy({ where: { id } })
    revalidatePath(`/admin/products/${productId}`)
    // redirect не нужен, т.к. клиентский компонент обновит страницу через router.refresh()
}