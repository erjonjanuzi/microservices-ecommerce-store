import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

// axios.interceptors.request.use((config: any) => {
//     const token = store.commonStore.token;
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
// });

axios.interceptors.response.use(
    async (response) => {
        // if (process.env.NODE_ENV === 'development') await sleep(1000);

        return response;
    },
    (error: AxiosError) => {
        const { data, status, config, headers } = error.response!;
        switch (status) {
            case 400:
                if (
                    config.method === 'get' &&
                    data.errors.hasOwnProperty('id')
                ) {
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
                    headers['www-authenticate']?.startsWith(
                        'Bearer error="invalid_token"'
                    )
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
    post: <T>(url: string, body: {}) =>
        axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) =>
        axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Auth = {
    current: () => requests.get('/api/auth/currentuser'),
    login: (user: any) => requests.post('/api/auth/signin', user),
    logout: () => requests.get('/api/auth/signout'),
    register: (user: any) => requests.post('/api/auth/signup', user),
    checkPersonalDetails: (personalDetails: any) =>
        requests.post('/api/auth/checkuser', personalDetails),
};

const Users = {
    details: (id: string) => requests.get(`/api/users/${id}`),
};

const Products = {
    all: () => requests.get('/api/products'),
    details: (id: string) => requests.get(`/api/products/${id}`),
};

const Cart = {
    addToCart: (body: { productId: string; quantity: number }) =>
        requests.post('/api/cart', body),
    getCart: () => requests.get('/api/cart'),
    removeFromCart: (body: { productId: string }) =>
        requests.put('/api/cart', body),
};

const agent = {
    Auth,
    Users,
    Products,
    Cart,
};

export default agent;
