export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
    emailConfirmed: boolean;
    address: {
        country: string;
        city: string;
        postalCode: string;
        street: string;
    };
    personalDetails: {
        phoneNumber: string;
    };
}

export interface UpdateCustomerFormValues {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    country: string;
    city: string;
    postalCode: string;
    street: string;
}
