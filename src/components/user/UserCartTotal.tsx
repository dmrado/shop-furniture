'use client'
import React, { useState } from 'react'

interface Product {
    id: number;
    isActive: boolean;
    articul: string;
    sku: string;
    name: string;
    description_1: string;
    description_2: string;
    length: number;
    width: number;
    height: number;
    weight: number;
    box_length: number;
    box_height: number;
    box_weight: number;
    image: string;
    old_price: number;
    new_price: number;
    primary_color: string;
    secondary_color: string;
    inStock: boolean;
}

interface CartItem {
    id: number;
    productId: number;
    quantity: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    discount: number;
    product: Product | null;
}

interface UserCartTotalProps {
    cartList: CartItem[];
}

export const UserCartTotal: React.FC<UserCartTotalProps> = ({ cartList }) => {

    const [selectedItems, setSelectedItems] = useState<number[]>([])

    const handleItemSelect = (itemId: number) => {
        setSelectedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        )
    }
    const selectedTotal = cartList
        .filter(item => selectedItems.includes(item.id))
        .reduce((sum, item) => sum + (item.product?.new_price || 0) * item.quantity, 0)

    const total = cartList
        .reduce((sum, item) => sum + (item.product?.new_price || 0) * item.quantity, 0)



    // Расчет общей суммы
    const calculateItemTotal = (item: CartItem): number => {
        if (!item.product) return 0;
        return item.product.new_price * item.quantity;
    };

    // Расчет общей скидки
    const totalDiscount = cartList.reduce((acc, item) => acc + (item.discount || 0), 0);

    // Расчет промежуточной суммы без скидки
    const subtotal = cartList.reduce((acc, item) => acc + calculateItemTotal(item), 0);

    // Итоговая сумма со скидкой
    const totalAmount = subtotal - totalDiscount;

    // Функция для шаринга корзины
    const shareCart = async () => {
        try {
            await navigator.share({
                title: 'Моя корзина',
                text: `Товаров в корзине: ${cartList.length}`,
            url: window.location.href
        });
        } catch (error) {
            console.error('Ошибка при попытке поделиться:', error);
        }
    };

    // Обработчики событий
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Select all:', e.target.checked);
    };

    const handleDeleteSelected = () => {
        console.log('Delete selected items');
    };

    return <>
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Корзина</h2>


                <div className="flex flex-col gap-4">
                    {selectedItems.length > 0 && (
                        <div className="flex justify-between">
                            <span>Выбрано на сумму:</span>
                            <span>{(selectedTotal)}</span>
                        </div>
                    )}
                    <div className="flex justify-between font-bold">
                        <span>Общая сумма:</span>
                        <span>{(total)}</span>
                    </div>
                </div>


                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="rounded"
                            onChange={handleSelectAll}
                        />
                        <span>Выбрать все</span>
                    </label>
                    <button
                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded"
                        onClick={handleDeleteSelected}
                    >
                        Удалить выбранные
                    </button>
                    <button
                        className="px-4 py-2 hover:bg-gray-100 rounded"
                        onClick={shareCart}
                    >
                        Поделиться
                    </button>
                </div>
            </div>

            <div className="mt-6 text-right">
                <div className="text-2xl font-bold">
                    Итого: {totalAmount.toFixed(2)} ₽
                </div>
                {totalDiscount > 0 && (
                    <div className="text-sm text-green-600">
                        Скидка: {totalDiscount.toFixed(2)} ₽
                    </div>
                )}
                <div className="text-sm text-gray-600 mt-1">
                    Количество товаров: {cartList.length}
                </div>
            </div>
        </div>
    </>
}