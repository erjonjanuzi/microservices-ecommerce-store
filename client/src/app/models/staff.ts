export interface Staff {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date
}

export interface StaffFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string
}