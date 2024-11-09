'use client'
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ItemList = ({stock}) => {
    const [items, setItems] = useState([])

    return <>
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-wrap gap-4 justify-between items-center">
                    <div className="space-x-4">
                        Something
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <div key={stock.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="relative h-48">
                            <Image
                                // src={item.image}
                                // alt={item.name}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{stock.quantity}</h3>
                            <p className="text-gray-600 text-sm mb-2">{stock.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold">${stock.price}</span>
                                <div className="flex items-center">
                                    <span className="text-yellow-400 mr-1">★</span>
                                    <span className="text-sm text-gray-600">{stock.rating}</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Пагинация */}
                {/*<div className="mt-8 flex justify-center">*/}
                {/*    <div className="flex space-x-2">*/}
                {/*        <button className="px-4 py-2 border rounded-md hover:bg-gray-100">*/}
                {/*            Previous*/}
                {/*        </button>*/}
                {/*        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">*/}
                {/*            1*/}
                {/*        </button>*/}
                {/*        <button className="px-4 py-2 border rounded-md hover:bg-gray-100">*/}
                {/*            2*/}
                {/*        </button>*/}
                {/*        <button className="px-4 py-2 border rounded-md hover:bg-gray-100">*/}
                {/*            3*/}
                {/*        </button>*/}
                {/*        <button className="px-4 py-2 border rounded-md hover:bg-gray-100">*/}
                {/*            Next*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
        </>
        }

        export default ItemList