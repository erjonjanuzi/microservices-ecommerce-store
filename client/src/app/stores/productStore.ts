import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Product } from "../models/product";

export default class ProductStore {
    productRegistry = new Map<string, Product>();
    selectedProduct: Product | undefined = undefined;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get products() {
        return Array.from(this.productRegistry.values())
    }

    loadProducts = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Products.all() as Product[];
            result.forEach(product => {
                this.setProduct(product);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadProduct = async (id: string) => {
        let product = this.getProduct(id);
        if (product) {
            this.selectedProduct = product;
            return product;
        } else {
            this.loadingInitial = true;
            try {
                product = await agent.Products.details(id) as Product;
                this.setProduct(product);
                runInAction(() => {
                    this.selectedProduct = product;
                })
                this.setLoadingInitial(false);
                return product;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setProduct = (product: Product) => {
        this.productRegistry.set(product.id, product);
    }

    private getProduct = (id: string) => {
        return this.productRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    
    clearSelectedProduct = () => {
        this.selectedProduct = undefined;
    }
}