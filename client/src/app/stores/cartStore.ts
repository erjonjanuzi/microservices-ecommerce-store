import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Cart, CartItem, ProductCartItem } from '../models/cart';
import { Product } from '../models/product';

export default class CartStore {
    cart: Cart | undefined = undefined;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    addProductToCart = async (productId: string, quantity: number) => {
        try {
            const isLoggedIn = await this.isLoggedIn()

            if (isLoggedIn) {
                await agent.Cart.addToCart({ productId, quantity });
                return;
            }

            // user is not logged in, save cart offline in local storage
            const cart = window.localStorage.getItem("cart");
            let parsedCart: Cart;

            if (!cart) {
                parsedCart = {
                    products: [],
                    totalPrice: 0,
                }
            } else {
                parsedCart = JSON.parse(cart);
            }

            const { id, title, images, sale, quantity: qty, price } = await agent.Products.details(productId) as Product;

            const cartItem: CartItem = {
                product: {
                    id,
                    title,
                    image: images[0].url,
                    sale,
                    quantity: qty,
                    price
                },
                quantity
            }

            parsedCart.products.push(cartItem);
            parsedCart.totalPrice = this.calculateTotalPrice(parsedCart.products);

            window.localStorage.setItem("cart", JSON.stringify(parsedCart));

            runInAction(() => {
                this.cart = parsedCart;
            })
        } catch (error) {
            throw error
        }
    };

    getCart = async () => {
        try {
            const isLoggedIn = await this.isLoggedIn()

            if (isLoggedIn) {
                const cart = await agent.Cart.getCart();
                runInAction(() => (this.cart = cart));
                return;
            }

            let cart = window.localStorage.getItem("cart");

            if (!cart) {
                runInAction(() => this.cart = {
                    products: [],
                    totalPrice: 0
                })
                return;
            }

            const parsedCart = JSON.parse(cart) as Cart;

            runInAction(() => (this.cart = parsedCart));
        } catch (error) {
            throw error
        }
    };

    removeProductFromCart = async (productId: string) => {
        try {
            const isLoggedIn = await this.isLoggedIn()

            if (isLoggedIn) {
                await agent.Cart.removeFromCart({ productId });
                await this.getCart();
                return;
            }

            let cart = window.localStorage.getItem("cart");

            if (!cart) {
                return;
            }

            const parsedCart = JSON.parse(cart) as Cart;

            parsedCart.products = parsedCart.products.filter(cartItem => cartItem.product.id !== productId)

            parsedCart.totalPrice = this.calculateTotalPrice(parsedCart.products);

            window.localStorage.setItem("cart", JSON.stringify(parsedCart));

            runInAction(() => {
                this.cart = parsedCart;
            })
        } catch (error) {
            throw error
        }
    };

    updateCartItemQuantity = async (body: { productId: string, quantity: number }) => {
        try {
            const isLoggedIn = await this.isLoggedIn()

            if (isLoggedIn) {
                await agent.Cart.updateCartItemQuantity(body);
                await this.getCart();
                return;
            }

            let cart = window.localStorage.getItem("cart");

            if (!cart) {
                return;
            }

            const parsedCart = JSON.parse(cart) as Cart;

            parsedCart.products = parsedCart.products.map(cartItem => {
                if (cartItem.product.id === body.productId) {
                    cartItem.quantity = body.quantity
                }
                return cartItem;
            })

            parsedCart.totalPrice = this.calculateTotalPrice(parsedCart.products);

            window.localStorage.setItem("cart", JSON.stringify(parsedCart));

            runInAction(() => {
                this.cart = parsedCart;
            })
        } catch (error) {
            throw error
        }
    }

    clearCart = async () => {
        try {
            window.localStorage.removeItem('cart');

            const isLoggedIn = await this.isLoggedIn()

            if (isLoggedIn) {
                await agent.Cart.clear();
                await this.getCart();
            }

        } catch (error) {
            console.error(error);
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