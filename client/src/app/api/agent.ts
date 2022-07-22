import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Cart as CartModel } from '../models/cart';
import { Category } from '../models/category';
import { Customer, UpdateCustomerFormValues } from '../models/customer';
import { PaginatedResult } from '../models/pagination';
import { Product, ProductFormValues } from '../models/product';
import { Staff as StaffModel, StaffFormValues } from '../models/staff';
import { Wishlist as WishlistModel } from '../models/wishlist';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

axios.interceptors.response.use(
    async (response) => {
        // if (process.env.NODE_ENV === 'development') await sleep(2000);
        const pagination = response.headers['pagination'];
        if (pagination) {
            response.data = new PaginatedResult(response.data, JSON.parse(pagination));
            return response as AxiosResponse<PaginatedResult<any>>;
        }
        return response;
    },
    (error: AxiosError) => {
        const { data, status, config, headers } = error.response!;
        switch (status) {
            case 400:
                if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                    history.push('/not-found');
                }
                if (data.errors) {
                    const modalStateErrors = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modalStateErrors.push(data.errors[key]);
                        }
                    }
                    throw modalStateErrors.flat();
                } else {
                    toast.error(data);
                }
                break;
            case 401:
                if (
                    status === 401 &&
                    headers['www-authenticate']?.startsWith('Bearer error="invalid_token"')
                ) {
                    store.userStore.logout();
                    toast.error('Session expired - please login again');
                }
                break;
            case 404:
                history.push('/not-found');
                break;
            case 500:
                store.commonStore.setServerError(data);
                history.push('/server-error');
                break;
        }
        return Promise.reject(error);
    }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Auth = {
    current: () => requests.get('/api/users/currentuser'),
    login: (user: any) => requests.post('/api/users/signin', user),
    logout: () => requests.get('/api/users/signout'),
    register: (user: any) => requests.post('/api/users/register', user),
    checkUser: (body: { email: string }) => requests.post('/api/users/checkuser', body),
};

const Users = {
    details: (id: string) => requests.get(`/api/users/${id}`),
    delete: (id: string) => requests.del(`/api/users/${id}`),
    changePassword: (values: { currentPassword: string; newPassword: string }) =>
        requests.post('/api/users/updatepassword', values),
    deleteAccount: () => requests.del('/api/users/deleteaccount'),
    forgotPassword: (body: { email: string }) =>
        requests.post('/api/users/forgotpassword/request', body),
    resetPassword: (body: { email: string; token: string; newPassword: string }) =>
        requests.post('/api/users/forgotpassword/reset', body),
    addDeliveryAddress: (body: { deliveryAddress: { country: string; city: string; postCode: string; street: string; }; }) =>
        requests.put('/api/users/account/addDeliveryAddress', body)
};

const Staff = {
    all: (params: URLSearchParams) =>
        axios
            .get<PaginatedResult<StaffModel[]>>('/api/users/allstaff', { params })
            .then(responseBody),
    details: (id: string) => requests.get(`/api/users/staff/${id}`),
    create: (staff: StaffFormValues) => requests.post<StaffModel>('/api/users/createadmin', staff),
    update: (id: string, staff: StaffFormValues) =>
        requests.put<StaffModel>(`/api/users/updateadmin/${id}`, staff),
};

const Customers = {
    all: (params: URLSearchParams) =>
        axios
            .get<PaginatedResult<Customer[]>>('/api/users/customers', { params })
            .then(responseBody),
    details: (id: string) => requests.get<Customer>(`/api/users/${id}`),
    update: (id: string, body: UpdateCustomerFormValues) =>
        requests.put<Customer>(`/api/users/update/${id}`, body),
};

const Products = {
    all: (params: URLSearchParams) =>
        axios
            .get<PaginatedResult<Product[]>>('/api/products', { params })
            .then(responseBody),
    details: (id: string) => requests.get(`/api/products/${id}`),
    postReview: (body: any) => requests.post<Product>('/api/products/addReview', body),
    deleteReview: (body: any) => requests.put<Product>('/api/products/deleteReview', body),
    getManufacturersByCategory: (categoryName: string) =>
        requests.get<string[]>(`/api/products/getManufacturersByCategory/${categoryName}`),
    getSimilarProducts: (productId: string) =>
        requests.get<Product[]>(`/api/products/getSimilarProducts/${productId}`),
    getPromotedProducts: () => requests.get<Product[]>('/api/products/getPromotedProducts'),
    getProductsByRating: () => requests.get<Product[]>('/api/products/getProductsByRating'),
    getProductsOnSale: () => requests.get<Product[]>('/api/products/getProductsOnSale'),
};

const Categories = {
    all: () => requests.get<Category[]>('/api/category'),
    details: (id: string) => requests.get<Category>(`/api/category/${id}`),
    create: (body: { categoryName: string }) => requests.post<Category>('/api/category', body),
    update: (id: string, body: { categoryName: string }) => requests.put<Category>(`/api/category/${id}`, body),
    delete: (id: string) => requests.del(`/api/category/${id}`)
}

const Inventory = {
    all: (params: URLSearchParams) =>
        axios
            .get<PaginatedResult<Product[]>>('/api/products/inventory', { params })
            .then(responseBody),
    create: (formData: FormData) => axios.post<Product>('/api/products/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(responseBody),
    promote: (productId: string, body: { isPromoted: boolean }) =>
        requests.put<Product>(`/api/products/promote/${productId}`, body),
    delete: (productId: string) =>
        requests.del(`/api/products/${productId}`),
    update: (productId: string, body: any) =>
        requests.put<Product>(`/api/products/update/${productId}`, body),
    numberOfProducts: () => requests.get('/api/products/getNumberOfProducts')
}

const Cart = {
    addToCart: (body: { productId: string; quantity: number }) => requests.post('/api/cart', body),
    getCart: () => requests.get<CartModel>('/api/cart'),
    removeFromCart: (body: { productId: string }) => requests.put('/api/cart/removeItem', body),
    updateCartItemQuantity: (body: { productId: string, quantity: number }) => requests.put('/api/cart', body),
    clear: () => requests.get<CartModel>('/api/cart/clear')
};

const Wishlist = {
    getWishlist: () => requests.get<WishlistModel>('/api/wishlist'),
    addItem: (body: { productId: string }) => requests.post<WishlistModel>('/api/wishlist', body),
    removeItem: (body: { productId: string }) => requests.put<WishlistModel>('/api/wishlist/removeItem', body),
    clear: () => requests.get<WishlistModel>('/api/wishlist/clear')
}

const Orders = {
    createOrder: (body: { items: any[], contact: any }) => requests.post('/api/orders', body),
    getOrder: (id: string) => requests.get(`/api/orders/${id}`),
    getMyOrders: () => requests.get('/api/orders/my'),
    getOrders: (params: URLSearchParams) =>
        axios
            .get<PaginatedResult<any[]>>('/api/orders', { params })
            .then(responseBody),
    updateOrderStatus: (orderId: string, body: { status: string }) => requests.put(`/api/orders/${orderId}`, body),
    getOrdersByStatus: (params: URLSearchParams, status: string) =>
        axios
            .get<PaginatedResult<any[]>>(`/api/orders/${status}`, { params })
            .then(responseBody),
    numberOfOrders: () => requests.get('/api/orders/getNumberOfOrders'),
    totalRevenue: () => requests.get('/api/orders/getRevenue'),
    numberOfAwaitingOrders: () => requests.get('/api/orders/getNumberOfAwaitingOrders'),
}

const Payments = {
    pay: (body: { orderId: string, token: string }) => requests.post('/api/payments', body),
}

const agent = {
    Auth,
    Users,
    Products,
    Cart,
    Staff,
    Customers,
    Inventory,
    Orders,
    Payments,
    Wishlist,
    Categories
};

export default agent;
