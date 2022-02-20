import { makeAutoObservable, reaction, runInAction } from 'mobx';
import agent from '../api/agent';

export default class CartStore {
    cart: any = undefined;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    addProductToCart = async (productId: string, quantity: number) => {
        try {
            await agent.Cart.addToCart({ productId, quantity });
        } catch (error) {
            console.log(error);
        }
    };

    getCart = async () => {
        try {
            const cart = await agent.Cart.getCart();
            runInAction(() => (this.cart = cart));
        } catch (error) {
            console.log(error);
        }
    };

    removeProductFromCart = async (productId: string) => {
        try {
            await agent.Cart.removeFromCart({ productId });
        } catch (error) {
            console.log(error);
        }
    };
}
