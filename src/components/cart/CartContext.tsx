"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  CartRow,
  getCart,
  deleteCartRowAction,
  updateQuantityAction,
} from "@/actions/cartActions";
import { addProductToCartAction } from "@/actions/cartActions";

const CartContext = createContext({
  finalAmount: 0,
  totalOldPrice: 0,
  totalDiscount: 0,
  totalDiscountPercent: 0,
  count: 0,
  cartRows: [] as CartRow[],
  isLoading: false,
  updateQuantity: async (id: number, quantity: number) => {},
  deleteCartRow: async (id: number) => {},
  addProductToCart: async (id: number) => {},
  selectedItems: new Set<number>(), // храним ID выбранных элементов
  toggleSelection: (id: number) => {}, // функция для переключения выбора
  setSelectedItems: Set<number>,
  onSelect: true,
  setOnSelect: () => {},
  selectedTotalAmount: 0,
  selectAll: () => {id: Number},
  unselectAll: () => {id: Number},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartRows, setCartRows] = useState<CartRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // todo стейты для чекбокса выбора товаров в корзине
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [onSelect, setOnSelect] = useState(true);

  // Функция для переключения выбора элемента корзины
  const toggleSelection = useCallback((id: number) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  //  Функции для выбора/сброса всех элементов корзины
  const selectAll = useCallback(() => {
    const allIds = new Set(cartRows.map((row) => row.id));
    setSelectedItems(allIds);
  }, [cartRows]);

  const unselectAll = useCallback(() => {
    setSelectedItems(new Set());
  }, []);

// Функция для подсчета общей суммы только выбранных товаров
  const selectedTotalAmount = cartRows
  .filter(row => selectedItems.has(row.id))
  .reduce((sum, item) => sum + item.product.new_price * item.quantity, 0)


  // Функция получения содержимого корзины
  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      const rows = await getCart();
      setCartRows(rows);
      setIsLoading(false);
      console.log("rows", rows);
    };
    fetchCart();
  }, []);

  //   Функция обновления количества элемента корзины
  const updateQuantity = async (
    cartId: number,
    newQuantity: number
  ): Promise<void> => {
    const updatedCartRow = await updateQuantityAction({
      id: cartId,
      newQuantity,
    });
    const updatedCartRows = cartRows.map((row) =>
      row.id === updatedCartRow.id ? updatedCartRow : row
    );
    setCartRows(updatedCartRows);
  };

  //   Функция удаления элемента корзины
  const deleteCartRow = async (id: number) => {
    await deleteCartRowAction(id);
    const updatedCartRows = cartRows.filter((row) => row.id !== id);
    setCartRows(updatedCartRows);
  };

  //   Функция добавления элемента корзины
  const addProductToCart = async (productId: number) => {
    const updatedCartRows = await addProductToCartAction(productId);
    setCartRows(updatedCartRows);
  };

  // Расчет общей скидки в процентах
  const totalOldPrice = cartRows.reduce(
    (sum, item) => sum + item.product.old_price * item.quantity,
    0
  );
  const totalNewPrice = cartRows.reduce(
    (sum, item) => sum + item.product.new_price * item.quantity,
    0
  );

  const totalDiscount = totalOldPrice - totalNewPrice;

  const totalDiscountPercent = (totalDiscount / totalOldPrice) * 100;

  const finalAmount = totalOldPrice - totalDiscount;

  const value = {
    isLoading,
    totalOldPrice,
    totalDiscount,
    finalAmount,
    totalDiscountPercent,
    count: cartRows.length,
    cartRows,
    addProductToCart,
    updateQuantity,
    deleteCartRow,
    selectedItems,
    toggleSelection,
    onSelect,
    setOnSelect,
    selectAll,
    unselectAll,
    selectedTotalAmount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
export const useCartContext = () => useContext(CartContext);
