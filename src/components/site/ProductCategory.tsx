'use client'
import Image from "next/image"
import Link from "next/link"
import {useCartContext} from "@/components/cart/CartContext";
import {useState} from "react";
import {ProductListItem} from "@/actions/productActions";
import {Category} from "@/db/models/category.model";

// todo заменить product на category после создания модели CategoryModel
const ProductCategory = ({category}: { category: Category }) => {
    const [isHovered, setIsHovered] = useState(false)

    return <>
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group bg-white shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#E99C28]"
        >
            {/* Image Container */}
            <div className="relative h-52 overflow-hidden bg-gray-50">
                <Image
                    // src={category.image}
                    alt={category.name}
                    // alt={`Picture of the ${category.name}`}
                    width={260}
                    height={200}
                    // fill
                    className={`w-full h-52 object-cover transform transition-transform duration-700 ${
                        isHovered ? "scale-110" : "scale-100"
                    }`}
                    priority
                />
                {/* Category */}
                <Link href={`/products/divani/${category.id}`} className="absolute bottom-2 left-2 w-full p-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-[#E99C28] transition-colors">
                        {category.name}
                    </h3>
                </Link>
            </div>
        </div>
    </>
}

export default ProductCategory