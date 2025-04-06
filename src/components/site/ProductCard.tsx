"use client";
import React, {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {useCartContext} from "@/components/cart/CartContext";
import {ProductListItem} from "@/actions/productActions";

const ProductCard = ({product, subCategory}: { product: ProductListItem }) => {
    const {addProductToCart} = useCartContext();
    const [isHovered, setIsHovered] = useState(false);
    const discount = (1 - product.new_price / product.old_price) * 100;

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group bg-white shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#E99C28]"
        >
            {/* Image Container */}
            <div className="relative h-52 overflow-hidden bg-gray-50">
                <div className="absolute top-3 right-3 z-10 space-y-2">
                    {discount > 0 && (
                        <span className="block px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-sm">
              -{discount.toFixed()}%</span>
                    )}
                    {product.isNew && (
                        <span
                            className="block px-3 py-1 text-xs font-medium text-white bg-green-600 text-color-[#171613] rounded-sm">
              Новинка </span>
                    )}
                </div>

                <Image
                    src={product.image}
                    alt={product.name}
                    width={260}
                    height={200}
                    // fill
                    className={`w-full h-52 object-cover transform transition-transform duration-700 ${
                        isHovered ? "scale-110" : "scale-100"
                    }`}
                    priority
                />
            </div>

            {/* Description */}
            <div className="relative h-48 p-4 flex flex-col">
                <div className="flex justify-between items-center space-x-2">
          <span className="text-xs text-gray-800 bg-white/80 px-1 rounded">
            <span className="text-amber-500 text-xs mr-1">★</span>В наличии
          </span>

                    {/* Кнопка добавления в избранное */}
                    <button
                        className="hover:shadow-white text-black p-1 rounded transition hover:text-[#E99C28]"
                        onClick={() => {
                            console.log("Added to favorites", product.id);
                            // addToFavorites(product.id);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor" //Свойство stroke="currentColor" в SVG берет текущий цвет текста из родительского элемента
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </button>

                </div>

                {/* Product */}
                <Link href={`/catalog/${subCategory}/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 my-6 group-hover:text-[#E99C28] transition-colors">
                        {product.name}
                    </h3>

                    {/* product description */}
                    {/*<p className="text-gray-600 text-sm mb-4 line-clamp-2">*/}
                    {/*    {product.description_1}*/}
                    {/*</p>*/}
                </Link>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <div className="text-md text-gray-900">{product.new_price}₽</div>
                            {/* {product.old_price > product.new_price && (
                <div className="text-sm text-gray-500 line-through">
                  {product.old_price}₽
                </div>
              )} */}
                        </div>

                        {/* <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg">
               <span className="text-yellow-400 mr-1.5">★</span>
               <span className="text-sm font-medium text-gray-700"> */}
                        {/* /!*todo заменить на рейтинг, в БД пока нет*!/ */}
                        {/* 5 */}
                        {/*    /!*    {product.rating}*!/*/}
                        {/* </span>
           </div> */}
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* Кнопка добавления в корзину */}
                        <button
                            className="hover:shadow-white text-black p-1 rounded transition hover:text-[#E99C28]"
                            // onClick={() => addToCart(product.id)}
                            onClick={() => {
                                console.log("product.id front", product.id);
                                addProductToCart(product.id);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            {/*<div className="p-6">*/}
            {/*    /!* Category *!/*/}
            {/*    <div className="text-xs font-medium text-indigo-600 mb-2">*/}
            {/*        Category: {product.category}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default ProductCard;
