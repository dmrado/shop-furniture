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
    getCartAction,
    deleteCartRowAction,
    deleteSelectedCartRowsAction,
    updateQuantityAction,
} from '@/actions/cartActions'
import { addProductToCartAction } from '@/actions/cartActions'
import { getCurrentUserAction } from '@/actions/userActions'
import { AuthUser } from '@/db/models/users.model'

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
    selectedItems: [], // храним ID выбранных элементов
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
    const [ selectedItems, setSelectedItems ] = useState<number[]>([])
    const [ onSelect, setOnSelect ] = useState(true)

    //так как layout дергает useEffect получения корзины и при входе на сайт назалогининого пользователя редиректит его на signin через getCartAction
    const [ user, setUser ] = useState<AuthUser | null | undefined>(null)

    useEffect(() => {
        const loadUser = async () => {
            try{
                const currentUser: AuthUser = await getCurrentUserAction()
                setUser(currentUser)
            }catch(error) {
                console.log('Ошибка при загрузке пользователя', error)
            }
        }
        loadUser()
    }, [])

    // Функция для переключения выбора элемента корзины
    const toggleSelection = useCallback((id: number) => {
        setSelectedItems((prev) => {
            if (prev.includes(id)) {
                return prev.filter((newId) => newId !== id)
            } else {
                return [ ...prev, id ]
            }
        })
    }, [])

    //  Функции для выбора/сброса всех элементов корзины
    const selectAll = useCallback(() => {
        const allIds = [ ...cartRows.map((row) => row.id) ]
        setSelectedItems(allIds)
    }, [ cartRows ])

    const unselectAll = useCallback(() => {
        setSelectedItems([])
    }, [])

    // Функция для подсчета общей суммы только выбранных товаров
    //todo need check что переменная cartRows не инициализирована или равна undefined к моменту выполнения этого кода. Ошибка возникает еще до того, как код доходит до обращения к item.product.new_price. Проверьте, где и как инициализируется переменная cartRows. Возможно, вы пытаетесь использовать её до того, как данные загружены с сервера или до инициализации состояния. Если вы используете асинхронную загрузку данных, убедитесь, что вы обрабатываете начальное состояние, когда данные еще не загружены.
    const selectedTotalAmount = cartRows
        ? cartRows
            .filter((row) => selectedItems.includes(row.id))
            .reduce((sum, item) => sum + item.product.new_price * item.quantity, 0)
        : 0

    // Функция получения содержимого корзины
    useEffect(() => {
        const fetchCart = async () => {
            setIsLoading(true)

            if (user) {
                const rows = await getCartAction()
                setCartRows(rows)
            }

            setIsLoading(false)
            setSelectedItems(cartRows.map((row) => row.id))
            console.log('rows', cartRows)
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
            setCartRows((prevItems) =>
                prevItems.filter((item) => !selectedIds.includes(item.id))
            )
            // Warning изменить если все элементы по умолчанию должны быть выделены
            setSelectedItems([])
        }
    }

    //   Функция добавления элемента корзины
    const addProductToCart = async (selectedVariantId: number, quantity = 1) => {
        const updatedCartRows = await addProductToCartAction(selectedVariantId, quantity)
        setCartRows(updatedCartRows)
    }

    // Расчет общей скидки в процентах
    //todo need check
    const totalOldPrice = cartRows
        ? cartRows.reduce(
            (sum, item) => sum + item.product.old_price * item.quantity,
            0
        )
        : 0
    const totalNewPrice = cartRows
        ? cartRows.reduce(
            (sum, item) => sum + item.product.new_price * item.quantity,
            0
        )
        : 0

    const totalDiscount = totalOldPrice - totalNewPrice

    const totalDiscountPercent = (totalDiscount / totalOldPrice) * 100

    const finalAmount = totalOldPrice - totalDiscount

    const value = {
        totalOldPrice,
        totalDiscount,
        finalAmount,
        totalDiscountPercent,
        //todo need check <?> below
        count: cartRows?.length,
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
