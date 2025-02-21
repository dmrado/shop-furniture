// types/interfaces.ts

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
