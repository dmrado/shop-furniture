export type DictionaryItem = {
    id: number;
    name: string;
    description?: string; // Добавляем, если BrandModel.findAll возвращает
    isActive?: boolean;
};