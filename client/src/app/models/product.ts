export interface Product {
    id: string;
    title: string;
    price: number;
    quantity: number;
    description: string;
    category: string;
    images: [{
        url: string;
        isMain?: boolean | undefined;
    }];
    rating?: number;
    sale?: number;
    reviews?: [{
        firstName: string;
        lastName: string;
        comment: string;
    }];
}