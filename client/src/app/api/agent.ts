import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Customer, UpdateCustomerFormValues } from '../models/customer';
import { PaginatedResult } from '../models/pagination';
import { Staff as StaffModel, StaffFormValues } from '../models/staff';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

axios.interceptors.response.use(
    async (response) => {
        // if (process.env.NODE_ENV === 'development') await sleep(500);
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
    resetPassword: (body: {email: string, token: string, newPassword: string}) => 
        requests.post('/api/users/forgotpassword/reset', body)
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
    all: () => requests.get('/api/products'),
    details: (id: string) => requests.get(`/api/products/${id}`),
};

const Cart = {
    addToCart: (body: { productId: string; quantity: number }) => requests.post('/api/cart', body),
    getCart: () => requests.get('/api/cart'),
    removeFromCart: (body: { productId: string }) => requests.put('/api/cart', body),
};

const agent = {
    Auth,
    Users,
    Products,
    Cart,
    Staff,
    Customers,
};

export default agent;
