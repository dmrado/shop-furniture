"use client";
import React, { useEffect, useRef } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

// Левое боковое меню с фильтрами
const SideBar = ({ tags }) => {
  // для корректной работы @headlessui/react
  const disclosureButtonRef = useRef<HTMLButtonElement | null>(null);

  const tagsArray =
    tags && tags.tags && Array.isArray(tags.tags) ? tags.tags : [];

  // Находим родительские теги (parentId === null)
  const parentTags = tagsArray.filter((tag) => tag.parentId === null);

  // Создаем функцию для получения дочерних тегов
  const getChildTags = (parentId) => {
    return tagsArray.filter((tag) => tag.parentId === parentId);
  };

  return (
    <div className="flex flex-col  gap-6">
      <div className="w-full md:w-64 flex-shrink-0">
        <ul>
          <div className="mb-4">
            {parentTags.map((parentTag) => (
              <Disclosure>
                {({ open }) => (
                  <>
                    <li key={parentTag.id}>
                      <div className="flex justify-between items-center py-1 hover:text-[#E99C28]">
                        <DisclosureButton
                          ref={disclosureButtonRef}
                          type="button"
                          className="flex w-full justify-between rounded-sm bg-gray-100 px-4 py-3 text-left text-sm font-medium hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75"
                        >
                          <h3 className="font-medium text-[#383838] hover:text-[#E99C28]">
                            {parentTag.name}
                          </h3>
                          <ChevronDownIcon
                            className={clsx("w-5", open && "rotate-180")}
                          />
                        </DisclosureButton>
                      </div>
                      <div className="py-2 space-y-2">
                        <DisclosurePanel
                          transition
                          className="origin-top transition duration-300 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0 px-4 pt-4 pb-2 text-sm text-gray-500"
                        >
                          {/* Отображаем дочерние теги для текущего родительского тега */}
                          {getChildTags(parentTag.id).map((childTag) => (
                            <div key={childTag.id} className="pl-2">
                              <button
                                className="w-full text-left py-1 text-[#383838] hover:text-[#E99C28]"
                                // todo server action в БД через TagModel за products со slug или id
                                // onClick={() =>applyFilterAction(childTag.slug)}
                              >
                                {childTag.name}
                              </button>
                            </div>
                          ))}
                        </DisclosurePanel>
                      </div>
                    </li>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </ul>

        {/* Фильтр: Цена */}
        <div className="mb-2">
          <h3 className="text-[#383838] font-medium">Цена</h3>
        </div>

        <div>
          <div className="py-4 space-y-4">
            <div className="flex gap-2">
              <input
                type="number"
                className="w-1/2 border hover:border-[#383838] focus:border-[#383838] text-[#383838] p-2 text-sm"
                placeholder={0}
                min={0}
                // onInput={() =>updatePriceRange}
                v-model="priceMin"
              />
              <input
                type="number"
                className="w-1/2 border p-2 text-sm"
                placeholder="8 500 765"
                min={0}
                // onInput={() => updatePriceRange" v-model="priceMax"}
              />
            </div>
            <div className="relative pt-1">
              <div className="flex h-2 bg-gray-200 rounded">
                <div className="h-2 bg-amber-500 rounded" />
              </div>
              <div className="absolute left-0 top-0 h-2 flex items-center">
                <div
                  className="w-4 h-4 bg-amber-500 rounded-full cursor-pointer"
                  // onMouseDown={() => startDragging('min')}
                />
              </div>
              <div className="absolute right-0 top-0 h-2 flex items-center">
                <div
                  className="w-4 h-4 bg-amber-500 rounded-full cursor-pointer"
                  // onMouseDown={() => startDragging('max')"}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* Дополнительные фильтры */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="inStock"
                className="form-checkbox h-4 w-4 text-amber-500"
                // onChange={e => applyFilter('inStock', e.target.checked)}
              />
              <label htmlFor="inStock" className="ml-2 text-sm text-[#383838]">
                В наличии
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="new2024"
                className="form-checkbox h-4 w-4 text-amber-500"
                // onChange={e => applyFilter('new2024', e.target.checked)}
              />
              <label htmlFor="new2024" className="ml-2 text-sm text-[#383838]">
                Новинки 2024
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="discounted"
                className="form-checkbox h-4 w-4 text-amber-500"
                // onChange={e => applyFilter('discounted', e.target.checked)}
              />
              <label htmlFor="discounted" className="ml-2 text-sm text-[#383838]">
                Со скидками
              </label>
            </div>
          </div>

          {/* Кнопка сброса фильтров */}
          <button
            className="flex items-center text-sm text-[#383838] hover:text-black"
            // onClick={() => clearAllFilters}
          >
            Очистить все
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
