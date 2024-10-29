// types/models.ts
export interface Address {
    id: number;
    userid: number;
    phone: string;
    city: string;
    street: string;
    home: number;
    corps: number;
    appart: number;
    ismain: boolean;
}

export interface Color {
    id: number;
    isactive: boolean;
    colorcode: string;
}

export interface Item {
    id: number;
    isactive: boolean;
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
    pictures: string;
    old_price: number;
    new_price: number;
    primary_color: number;
    secondary_color: number;
    instock: boolean;
}

export interface OrderedItem {
    order: number;
    item: number;
    quantity: number;
    status: number;
}


export interface Order {
    id: number;
    userid: number;
    adres: number;
    orderdate: Date;
    cartprice: number;
}

export interface Stock {
    itemid: number;
    quantity: number;
    instock: boolean;
    lastupdate: Date;
}

export interface User {
    id: number;
    email: string;
    uname: string;
    usurname: string;
    ufathername: string;
    cancontact: boolean;
    isactive: boolean;
}