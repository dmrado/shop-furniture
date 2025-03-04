'use client'
import {
    ReactNode,
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react'
import {
    CartRow,
    getCart,
    deleteCartRowAction,
    deleteSelectedCartRowsAction,
    updateQuantityAction,
} from '@/actions/cartActions'
import { addProductToCartAction } from '@/actions/cartActions'

const CartContext = createContext({
    finalAmount: 0,
    totalOldPrice: 0,
    totalDiscount: 0,
    totalDiscountPercent: 0,
    count: 0,
    cartRows: [] as CartRow[],
    isLoading: false,
    updateQuantity: async (cartId: number, quantity: number) => {},
    deleteCartRow: async (cartId: number) => {},
    addProductToCart: async (productId: number, quantity?: number) => {},
    selectedItems: new Set<number>(), // храним ID выбранных элементов
    toggleSelection: (id: number) => {}, // функция для переключения выбора
    //   setSelectedItems: Set<number>,
    onSelect: true,
    setOnSelect: () => {},
    selectedTotalAmount: 0,
    selectAll: () => {
        id: Number
    },
    unselectAll: () => {
        id: Number
    },
})

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [ cartRows, setCartRows ] = useState<CartRow[]>([])
    const [ isLoading, setIsLoading ] = useState(false)
    // todo стейты для чекбокса выбора товаров в корзине
    const [ selectedItems, setSelectedItems ] = useState<Set<number>>(new Set())
    const [ onSelect, setOnSelect ] = useState(true)

    // Функция для переключения выбора элемента корзины
    const toggleSelection = useCallback((id: number) => {
        setSelectedItems((prev) => {
            const newSet = new Set(prev)
            if (newSet.has(id)) {
                newSet.delete(id)
            } else {
                newSet.add(id)
            }
            return newSet
        })
    }, [])

    //  Функции для выбора/сброса всех элементов корзины
    const selectAll = useCallback(() => {
        const allIds = new Set(cartRows.map((row) => row.id))
        setSelectedItems(allIds)
    }, [ cartRows ])

    const unselectAll = useCallback(() => {
        setSelectedItems(new Set())
    }, [])

    // Функция для подсчета общей суммы только выбранных товаров
    const selectedTotalAmount = cartRows
        .filter((row) => selectedItems.has(row.id))
        .reduce((sum, item) => sum + item.product.new_price * item.quantity, 0)

    // Функция получения содержимого корзины
    useEffect(() => {
        const fetchCart = async () => {
            setIsLoading(true)
            const rows = await getCart()
            setCartRows(rows)
            setIsLoading(false)
            console.log('rows', rows)
        }
        fetchCart()
    }, [])

    //   Функция обновления количества элемента корзины
    const updateQuantity = async (
        cartId: number,
        newQuantity: number
    ): Promise<void> => {
        const updatedCartRows = await updateQuantityAction({
            id: cartId,
            newQuantity,
        })
        setCartRows(updatedCartRows)
    }

    //   Функция удаления элемента корзины
    const deleteCartRow = async (cartId: number) => {
        await deleteCartRowAction(cartId)
        const updatedCartRows = cartRows.filter((row) => row.id !== cartId)
        setCartRows(updatedCartRows)
    }

    //  Функции для удаления выделенных элементов корзины
    const deleteSelectedCartRows = async (id: Array<number>) => {
        const selectedIds = Array.from(selectedItems)
        const result = await deleteSelectedCartRowsAction(selectedIds)

        if (result.success) {
            console.log(`Successfully deleted ${result.deletedCount} items`)
            setCartRows(prevItems => prevItems.filter(item => !selectedIds.includes(item.id)))
            // Warning изменить если все элементы по умолчанию должны быть выделены
            setSelectedItems(new Set())
        }}

    //   Функция добавления элемента корзины
    const addProductToCart = async (productId: number, quantity = 1) => {
        const updatedCartRows = await addProductToCartAction(productId, quantity)
        setCartRows(updatedCartRows)
    }

    // Расчет общей скидки в процентах
    const totalOldPrice = cartRows.reduce(
        (sum, item) => sum + item.product.old_price * item.quantity,
        0
    )
    const totalNewPrice = cartRows.reduce(
        (sum, item) => sum + item.product.new_price * item.quantity,
        0
    )

    const totalDiscount = totalOldPrice - totalNewPrice

    const totalDiscountPercent = (totalDiscount / totalOldPrice) * 100

    const finalAmount = totalOldPrice - totalDiscount

    const value = {
        totalOldPrice,
        totalDiscount,
        finalAmount,
        totalDiscountPercent,
        count: cartRows.length,
        cartRows,
        addProductToCart,
        updateQuantity,
        deleteCartRow,
        deleteSelectedCartRows,
        selectedItems,
        toggleSelection,
        onSelect,
        setOnSelect,
        selectAll,
        unselectAll,
        selectedTotalAmount,
        isLoading,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export const useCartContext = () => useContext(CartContext)
