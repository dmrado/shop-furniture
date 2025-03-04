// types/interfaces.ts

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
    isActive: boolean;
    colorCode: string;
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
    box_length: number;
    box_height: number;
    box_weight: number;
    image: string;
    old_price: number;
    new_price: number;
    primary_color: number;
    secondary_color: number;
    inStock: boolean;
}

export interface OrderedProducts {
    id: number;
    orderId: number;
    product: number;
    quantity: number;
    status: number;
}

export interface Order {
    id: number;
    userId: number;
    addressId: number;
    comment: string;
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
