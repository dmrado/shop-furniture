"use client";
import React, { useEffect, useState } from "react";
import CartTotalAmount from "@/components/cart/CartTotalAmount";
import { useCartContext } from "@/components/cart/CartContext";

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
                <span>Выбрано на сумму:</span>
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
          <CartTotalAmount />
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
            Количество товаров: {isLoading ? "..." : count}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartTotal;
