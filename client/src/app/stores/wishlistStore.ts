import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Product } from '../models/product';
import { Wishlist } from '../models/wishlist';

export default class WishlistStore {
    wishlist: Wishlist | undefined = undefined;
    products: Product[] | undefined = undefined;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    getWishlist = async () => {
        try {
            const isLoggedIn = await this.isLoggedIn();

            if (isLoggedIn) {
                const wishlist = await agent.Wishlist.getWishlist();
                runInAction(() => (this.wishlist = wishlist));
                return;
            }

            // user is not logged in, save wishlist offline in local storage
            let wishlist = window.localStorage.getItem("wishlist");

            if (!wishlist) {
                runInAction(() => this.wishlist = {
                    products: [],
                })
                return;
            }

            const parsedWishlist = JSON.parse(wishlist) as Wishlist;

            runInAction(() => (this.wishlist = parsedWishlist));
        } catch (error) {
            throw error
        }
    };

    addProductToWishlist = async (productId: string) => {
        try {
            const isLoggedIn = await this.isLoggedIn();

            if (isLoggedIn) {
                const wishlist = await agent.Wishlist.addItem({ productId });
                runInAction(() => (
                    this.wishlist = wishlist
                ))
                return;
            }

            const wishlist = window.localStorage.getItem("wishlist");
            let parsedWishlist: Wishlist;

            if (!wishlist) {
                parsedWishlist = {
                    products: [],
                }
            } else {
                parsedWishlist = JSON.parse(wishlist);
            }

            parsedWishlist.products.push(productId);

            window.localStorage.setItem("wishlist", JSON.stringify(parsedWishlist));

            runInAction(() => {
                this.wishlist = parsedWishlist;
            })
        } catch (error) {
            throw error;
        }
    }

    removeProductFromWishlist = async (productId: string) => {
        try {
            const isLoggedIn = await this.isLoggedIn()

            if (isLoggedIn) {
                const wishlist = await agent.Wishlist.removeItem({ productId });
                runInAction(() => (
                    this.wishlist = wishlist
                ))
                return;
            }

            let wishlist = window.localStorage.getItem("wishlist");

            if (!wishlist) {
                return;
            }

            const parsedWishlist = JSON.parse(wishlist) as Wishlist;

            parsedWishlist.products = parsedWishlist.products.filter(id => id !== productId)

            window.localStorage.setItem("wishlist", JSON.stringify(parsedWishlist));

            runInAction(() => {
                this.wishlist = parsedWishlist;
            })
        } catch (error) {
            throw error
        }
    }

    clearWishlist = async () => {
        try {
            window.localStorage.removeItem('wishlist');

            const isLoggedIn = await this.isLoggedIn()

            if (isLoggedIn) {
                await agent.Wishlist.clear();
            }

            await this.getWishlist();
            
        } catch (error) {
            throw error;
        }
    }

    getWishlistProducts = async () => {
        try {
            const isLoggedIn = await this.isLoggedIn()

            if (isLoggedIn) {
                const wishlist = await agent.Wishlist.getWishlist();
                const products: Product[] = []
                for (const productId of wishlist.products) {
                    const product = await agent.Products.details(productId) as Product;
                    products.push(product);
                }

                runInAction(() => (
                    this.products = products
                ))
                return;
            }

            const wishlist = window.localStorage.getItem('wishlist');

            if (!wishlist) return;

            const parsedWishlist = JSON.parse(wishlist);

            const products: Product[] = []
            for (const productId of parsedWishlist.products) {
                const product = await agent.Products.details(productId) as Product;
                products.push(product);
            }

            runInAction(() => (
                this.products = products
            ))
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
}