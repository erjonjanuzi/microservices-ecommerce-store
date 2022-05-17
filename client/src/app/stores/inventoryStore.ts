import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Pagination, PagingParams } from '../models/pagination';
import { Product, ProductFormValues } from '../models/product';

export default class InventoryStore {
    productRegistry = new Map<string, Product>();
    selectedProduct: Product | undefined = undefined;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    searchString: string = '';
    sortingParams: string = '';

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

        if (this.searchString != '') {
            params.append('search', this.searchString);
        }

        if (this.sortingParams != '' && this.searchString == '') {
            params.append('sort', this.sortingParams);
        }

        return params;
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    };

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    };

    setSearchString = (searchString: string) => {
        this.searchString = searchString;
        this.setPagingParams(new PagingParams(1))
    };

    setSortingParams = (sortingParams: string) => {
        this.sortingParams = sortingParams;
    };

    loadProducts = async () => {
        this.loadingInitial = true;
        try {
            this.productRegistry.clear();

            const result = await agent.Inventory.all(this.axiosParams);

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

    createProduct = async (product: ProductFormValues) => {
        try {
            let formData = new FormData();

            formData.append('title', product.title);
            formData.append('price', product.price.toString());
            formData.append('sale', product.sale.toString());
            formData.append('quantity', product.quantity.toString());
            formData.append('description', product.description);
            formData.append('category', product.category);

            for (let i = 0; i < product.images.length; i++){
                formData.append('images', product.images[i])
            }

            await agent.Inventory.create(formData);
        } catch (error) {
            throw error;
        }
    };

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
