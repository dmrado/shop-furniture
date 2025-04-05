'use client'; // Нужно для использования usePathname()

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

// Функция для построения URL пути категории
const buildPath = (categories, index = 0, basePath = '/catalog') => {
    // Если категорий нет или индекс вышел за пределы массива, возвращаем базовый путь
    if (!categories || index >= categories.length) return basePath;

    // Рекурсивно строим путь, добавляя slug каждой категории
    return buildPath(
        categories,
        index + 1,
        `${basePath}/${categories[index].slug}`
    );
};

// Функция для отображения одного элемента хлебных крошек
const renderBreadcrumbItem = (category, index, activePath) => {
    // Получаем URL для текущей категории
    const url = buildPath(activePath, index);

    return (
        <li key={category.id} className="inline-flex items-center">
            {/* Разделитель между элементами (кроме первого) */}
            {index > 0 && <span className="mx-2 text-gray-500">›</span>}

            <Link
                href={url}
                className={`text-sm hover:text-gray-900 ${
                    // Выделяем текущую (последнюю) категорию
                    index === activePath.length - 1 ? 'font-medium text-gray-900' : 'text-gray-600'
                }`}
            >
                {category.name}
            </Link>
        </li>
    );
};

// Функция для поиска категории по slug
const findCategoryBySlug = (categories, slug) => {
    // Если категорий нет, возвращаем null
    if (!categories) return null;

    // Перебираем все категории на текущем уровне
    for (const category of categories) {
        // Если нашли нужную категорию, возвращаем её
        if (category.slug === slug) {
            return category;
        }

        // Если у категории есть дочерние элементы, ищем в них
        if (category.children) {
            const found = findCategoryBySlug(category.children, slug);
            if (found) return found;
        }
    }

    // Если ничего не нашли, возвращаем null
    return null;
};

// Функция для определения активного пути на основе URL
const findActivePath = (categories, pathname) => {
    // Если путь не начинается с /catalog, возвращаем пустой массив
    if (!pathname || !pathname.startsWith('/catalog')) {
        return [];
    }

    // Разбиваем путь на части и удаляем пустые и 'catalog'
    const slugs = pathname.split('/').filter(segment => segment && segment !== 'catalog');

    // Если после фильтрации ничего не осталось, возвращаем пустой массив
    if (slugs.length === 0) {
        return [];
    }

    const result = [];
    let currentCategories = categories;

    // Проходим по всем slug в пути
    for (const slug of slugs) {
        // Ищем категорию с текущим slug
        const category = findCategoryBySlug(currentCategories, slug);
        if (!category) break;

        // Добавляем найденную категорию в результат
        result.push(category);
        // Переходим к дочерним категориям для следующего поиска
        currentCategories = category.children;
    }

    return result;
};

// Основной компонент хлебных крошек
const Breadcrumbs = ({ categories, activePath: propActivePath }) => {
    // Получаем текущий путь из URL
    const pathname = usePathname();

    // Определяем активный путь: используем переданный или находим по URL
    const activePath = useMemo(() => {
        // Если передан activePath, используем его
        if (propActivePath && propActivePath.length > 0) {
            return propActivePath;
        }
        // Иначе определяем по URL
        return findActivePath(categories, pathname);
    }, [categories, pathname, propActivePath]);

    // Если активного пути нет, не отображаем крошки
    if (!activePath || activePath.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center">
                {/* Домашняя страница - всегда первый элемент */}
                <li className="inline-flex items-center">
                    <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                        Главная
                    </Link>
                </li>

                {/* Отображаем все категории в активном пути */}
                {activePath.map((category, index) =>
                    renderBreadcrumbItem(category, index, activePath)
                )}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
