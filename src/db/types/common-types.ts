export type DictionaryItem = {
    id: number;
    name: string;
    description?: string; // Добавляем, если BrandModel.findAll возвращает
    isActive?: boolean;
};

// 💡 Тип для универсального стейта модалки
export type ModalState = {
    isOpen: boolean
    type: 'brand' | 'collection' | 'country' | 'style' | null
    initialData: DictionaryItem | null
}