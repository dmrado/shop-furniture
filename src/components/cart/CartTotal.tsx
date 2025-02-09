"use client";
import React, { useEffect, useState } from "react";
import CartTotalAmount from "@/components/cart/CartTotalAmount";
import { useCartContext } from "@/components/cart/CartContext";
import Link from "next/link";

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

const CartTotal = () => {
  const {
    totalOldPrice,
    totalDiscount,
    totalDiscountPercent,
    count,
    isLoading,
    selectedTotalAmount,
    selectAll,
    unselectAll,
    selectedItems,
    deleteSelectedCartRows,
  } = useCartContext();

  // Расчет общей суммы
  const calculateItemTotal = (item: CartItem): number => {
    if (!item.product) return 0;
    return item.product.new_price * item.quantity;
  };

  // todo Функция для шаринга корзины
  const shareCart = async () => {
    return;
    try {
      await navigator.share({
        title: "Моя корзина",
        text: `Товаров в корзине: ${count}`,
        url: window.location.href,
      });
    } catch (error) {
      console.error("Ошибка при попытке поделиться:", error);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Корзина</h2>

          <div className="flex flex-col gap-4">
            {/*todo селать прверку для подсчета только выбранных*/}
            {selectedTotalAmount > 0 && (
              <div className="flex justify-between">
                <span>Выбрано на сумму:&nbsp;</span>
                <span>{selectedTotalAmount.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded"
                onChange={(e) =>
                  e.target.checked ? selectAll() : unselectAll()
                }
              />
              <span
                title="Выбрать все"
                role="img"
                aria-label="select all"
                className="text-xl"
              >
                ☑️
              </span>
            </label>
            <button
              className="px-4 py-2 rounded transition-all duration-200 text-red-600 hover:bg-red-50 active:bg-red-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
              onClick={deleteSelectedCartRows}
              disabled={selectedItems.size === 0}
            >
              <span
                title="Удалить выбранные"
                role="img"
                aria-label="delete selected"
                className="text-xl"
              >
                🗑️
              </span>
            </button>

            <button
              className="px-4 py-2 hover:bg-gray-100 rounded"
              onClick={shareCart}
            >
              <span
                title="Поделиться"
                role="img"
                aria-label="share"
                className="text-xl"
              >
                ↗️
              </span>
            </button>
          </div>
        </div>

        <div className="mt-6 text-right">
          <div className="text-2xl text-green-600 font-bold">
            Итого: <CartTotalAmount/> ₽
          </div>
          <div className="flex justify-end font-bold">
            <span>Общая сумма:&nbsp;</span>
            <span>{isLoading ? "..." : totalOldPrice.toFixed(2)}</span>
          </div>
          {totalDiscountPercent > 0 && (
              <div className="text-sm text-red-600 font-bold">
                - {isLoading ? "..." : totalDiscountPercent.toFixed(2)} %
              </div>
          )}
          {totalDiscount > 0 && (
              <div className="text-sm text-red-600 font-bold">
                Скидка: {isLoading ? "..." : totalDiscount.toFixed(2)} ₽
              </div>
          )}
          <div className="text-sm text-gray-600 mt-1">
            Товарных позиций: {isLoading ? "..." : count}
          </div>

          <button className="w-2xl bg-indigo-600 text-white mt-1.5 py-3 px-4 rounded-xl font-medium
                    transition-all duration-300 transform
                    hover:bg-indigo-700 hover:shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                    active:scale-[0.98]">
            <Link href='/order'>
            Оформить доставку
            </Link>
          </button>

        </div>
      </div>
    </>
  );
};

export default CartTotal;
