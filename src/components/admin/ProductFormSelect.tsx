'use client'

import { PlusIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/outline'

// Общий тип для элементов справочника (бренды, коллекции и т.д.)
type DictionaryItem = {
    id: number;
    name: string;
    description?: string;
    isActive?: boolean;
};

// Тип для пропсов компонента
type ProductFormSelectWithActionsProps = {
    label: string; // "Бренд:", "Коллекция:" и т.д.
    name: string; // Имя для атрибута 'name' у select (e.g., "brandId")
    id: string; // ID для атрибута 'id' у select (e.g., "brandId")
    value: number | string; // Текущее выбранное значение (number для ID, string для placeholder)
    options: DictionaryItem[]; // Массив объектов { id: number, name: string }
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Обработчик изменения select

    // Пропсы для кнопки "Добавить"
    onAddClick: () => void;

    // Пропсы для кнопки "Редактировать"
    onEditClick: () => void;
    // Флаг, указывающий, нужно ли отображать кнопку редактирования
    showEditButton: boolean;

    // Функция для рендеринга опций (если она общая и вынесена)
    // Но лучше сделать её частью этого компонента, чтобы он был самодостаточным
    // renderOptions: (options: DictionaryItem[]) => JSX.Element[]; // Если хотите передавать
};

const ProductFormSelect = ({
    label,
    name,
    id,
    value,
    options,
    onChange,
    onAddClick,
    onEditClick,
    showEditButton,
}: ProductFormSelectWithActionsProps) => {

    // Вспомогательная функция для рендеринга опций
    const renderOptions = (items: DictionaryItem[]) => {
        if (!items) {
            return null // или пустой массив []
        }
        return items.map((item) => (
            <option key={item.id} value={item.id}>
                {item.name}
            </option>
        ))
    }

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
                {label}:
            </label>
            <div className="flex items-center gap-2"> {/* контейнер select + button+добавить + button+редактировать */}
                <select
                    required
                    name={name}
                    id={id}
                    value={value}
                    onChange={onChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Выберите {label}</option>
                    {renderOptions(options)}
                </select>

                {/* Кнопка "Добавить" с PlusIcon */}
                <button
                    type="button"
                    className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    onClick={onAddClick}
                    title={`Добавить новый ${label}`}
                >
                    <PlusIcon className="h-5 w-5" />
                </button>

                {/* Кнопка "Редактировать" с PencilIcon */}
                {showEditButton && (
                    <button
                        type="button"
                        className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                        onClick={onEditClick}
                        title={`Редактировать выбранный ${label}`}
                    >
                        <PencilIcon className="h-5 w-5" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default ProductFormSelect