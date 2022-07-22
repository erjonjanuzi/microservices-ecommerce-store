export interface Cart {
    userId?: string;
    products: CartItem[];
    id?: string;
    totalPrice: number;
}

export interface CartItem {
    product: ProductCartItem
    quantity: number;
}

export interface ProductCartItem {
    id: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
    sale: number;
}