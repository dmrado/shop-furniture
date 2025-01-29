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
