// types/interfaces.ts
import {UserModel} from "@/db/models/user.model";
import {ProductModel} from "@/db/models/product.model";

export interface Address {
    id: number;
    userId: number;
    phone: string;
    city: string;
    street: string;
    home: string;
    corps: string;
    appart: string;
    isMain: boolean;
}

export interface Color {
    id: number;
    isactive: boolean;
    colorcode: string;
}

export interface Product {
    id: number;
    isActive: boolean;
    articul: string;
    sku: string;
    name: string;
    description_1: string;
    description_2: string;
    length: number;
    width: number;
    height: number;
    weight: number;
    box_lenght: number;
    box_height: number;
    box_weight: number;
    image: string;
    old_price: number;
    new_price: number;
    primary_color: number;
    secondary_color: number;
    inStock: boolean;
}

export interface OrderedItem {
    order: number;
    item: number;
    quantity: number;
    status: number;
}


export interface Order {
    id: number;
    userId: number;
    addressId: number;
    orderDate: Date;
    cartPrice: number;
}

export interface Stock {
    itemId: number;
    quantity: number;
    inStock: boolean;
    lastUpdate: Date;
    items?: Product[]
}

export interface User {
    id: number;
    email: string;
    name: string;
    surName: string;
    fatherName: string;
    canContact: boolean;
    isActive: boolean;
    addresses?: Address[]
}

export interface Cart {
    id: number;
    itemId: number;
    quantity: number;
    userId: number;
    discount: number;
    datetime: Date;
    item?: ProductModel;
    user?: UserModel;
}
