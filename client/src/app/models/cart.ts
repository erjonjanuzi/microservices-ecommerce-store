export interface Cart {
    userId: string;
    products: CartItem[];
    id: string;
}

export interface CartItem {
    product: {
        id: string;
        title: string;
        image: string;
        price: number;
        quantity: number;
        sale: number;
    },
    quantity: number;
}
