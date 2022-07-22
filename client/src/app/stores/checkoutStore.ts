import { makeAutoObservable, runInAction } from 'mobx';
import { history } from '../..';
import agent from '../api/agent';
import { Cart, CartItem, ProductCartItem } from '../models/cart';

export default class CheckoutStore {
    checkoutProducts: Cart | undefined = undefined;
    loading = false;
    loadingInitial = false;
    orderInfo: any = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    checkoutFromCart = async (cart: Cart) => {
        try {
            this.checkoutProducts = cart;
        } catch (error) {
            console.error(error)
        }
    }

    checkoutBuyNow = async (productId: string) => {
        try {
            const product = await agent.Products.details(productId) as any;

            const productCartItem: ProductCartItem = {
                id: product.id,
                title: product.title,
                image: product.images[0].url,
                price: product.price,
                quantity: product.quantity,
                sale: product.sale,
            }

            const cartItem: CartItem = {
                product: productCartItem,
                quantity: 1
            }

            if (!product) {
                return;
            }

            const cart: Cart = {
                products: [cartItem],
                totalPrice: 0,
            }

            cart.totalPrice = this.calculateTotalPrice(cart.products);

            this.checkoutProducts = cart;
        } catch (error) {
            console.error(error);
        }
    }

    createOrder = async (products: any, orderInfo: any) => {
        try {
            const items: any[] = [];
            products.products.forEach((product: any) => {
                const item = {
                    productId: product.product.id,
                    quantity: product.quantity,
                }
                items.push(item);
            })

            const contact = {
                billingAddress: {
                    country: orderInfo.billingCountry === '' ? orderInfo.deliveryCountry : orderInfo.billingCountry,
                    city: orderInfo.billingCity === '' ? orderInfo.deliveryCity : orderInfo.billingCity,
                    postCode: orderInfo.billingPostCode === '' ? orderInfo.deliveryPostCode : orderInfo.billingPostCode,
                    street: orderInfo.billingStreet === '' ? orderInfo.deliveryStreet : orderInfo.billingStreet,
                },
                deliveryAddress: {
                    country: orderInfo.deliveryCountry,
                    city: orderInfo.deliveryCity,
                    postCode: orderInfo.deliveryPostCode,
                    street: orderInfo.deliveryStreet,
                },
                email: orderInfo.email,
                phoneNumber: orderInfo.phoneNumber,
                firstName: orderInfo.firstName,
                lastName: orderInfo.lastName,
            }

            const order = await agent.Orders.createOrder({ items, contact }) as any;

            this.orderInfo = {
                orderId: order.id,
                email: order.contact.email,
                amount: order.totalPrice,
            }

            runInAction(() => {
                history.push(`/checkout/pay/${order.id}`)
            })
        } catch (error) {
            throw error;
        }
    }

    isLoggedIn = async () => {
        const { currentUser } = (await agent.Auth.current()) as {
            currentUser: { id: string; email: string };
        };
        return currentUser != null;
    }

    calculateTotalPrice = (products: CartItem[]) => {
        let totalPrice = 0

        products.forEach((item: { product: ProductCartItem, quantity: number }) => {
            totalPrice += ((item.product.price - (item.product.price * (item.product.sale / 100))) * item.quantity);
        })

        return totalPrice;
    }
}