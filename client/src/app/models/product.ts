export interface Product {
    id: string;
    title: string;
    manufacturer: string;
    price: number;
    quantity: number;
    description: string;
    category: string;
    images: [{
        url: string;
        isMain?: boolean | undefined;
    }];
    rating: number;
    sale: number;
    reviews: [{
        userId: string;
        firstName?: string;
        lastName?: string;
        comment?: string;
        rating: number;
        _id: string;
        createdAt: string;
    }];
    isPromoted: boolean;
    createdAt: Date
}

export interface ProductFormValues {
    title: string;
    manufacturer: string;
    price: number;
    quantity: number;
    description: string;
    category: string;
    images: FileList;
    sale: number;
}