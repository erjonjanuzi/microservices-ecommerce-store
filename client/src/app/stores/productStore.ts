import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Pagination, PagingParams } from '../models/pagination';
import { Product } from '../models/product';

export default class ProductStore {
    productRegistry = new Map<string, Product>();
    selectedProduct: Product | undefined = undefined;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    category: string = 'all';
    sortingParams: string = '';
    manufacturers: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    get products() {
        return Array.from(this.productRegistry.values());
    }

    get axiosParams() {
        const params = new URLSearchParams();
    
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        params.append('category', this.category);

        if (this.sortingParams !== '')
            params.append('sort', this.sortingParams);
        
        if (this.manufacturers.length > 0){
            const token = this.manufacturers.join('+');
            params.append('manufacturers', token);
        }

        return params;
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    };

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    };

    setCategory = (newCategory: string) => {
        this.productRegistry.clear();
        this.setPagingParams(new PagingParams());
        this.setSortingParams('');
        this.setManufacturers([]);
        this.category = newCategory;
    }

    setSortingParams = (sorting: string) => {
        this.productRegistry.clear();
        this.sortingParams = sorting;
        this.setPagingParams(new PagingParams());
    }

    setManufacturers = (man: string[]) => {
        this.manufacturers = man;
        this.setSortingParams('');
    }

    loadProducts = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Products.all(this.axiosParams);
            
            result.data.forEach((product) => {
                this.setProduct(product);
            });

            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };

    loadProduct = async (id: string) => {
        let product = this.getProduct(id);
        if (product) {
            this.selectedProduct = product;
            return product;
        } else {
            this.loadingInitial = true;
            try {
                product = (await agent.Products.details(id)) as Product;
                this.setProduct(product);
                runInAction(() => {
                    this.selectedProduct = product;
                });
                this.setLoadingInitial(false);
                return product;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    };

    postReview = async (body: {
        productId: string, review:
            { rating: number, firstName?: string, lastName?: string, comment?: string, }
    }) => {
        try {
            const product = await agent.Products.postReview(body);
            runInAction(() => {
                this.selectedProduct = product;
            })
        } catch (error) {
            throw error;
        }
    }

    deleteReview = async (body: {
        productId: string,
        reviewId: string
    }) => {
        try {
            const product = await agent.Products.deleteReview(body);
            runInAction(() => {
                this.selectedProduct = product;
            })
        } catch (error) {
            throw error;
        }
    }

    private setProduct = (product: Product) => {
        this.productRegistry.set(product.id, product);
    };

    private getProduct = (id: string) => {
        return this.productRegistry.get(id);
    };

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    };

    clearSelectedProduct = () => {
        this.selectedProduct = undefined;
    };
}
