import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Pagination, PagingParams } from '../models/pagination';
import { Product, ProductFormValues } from '../models/product';

export default class OrderStore {
    orderRegistry = new Map<string, any>();
    selectedOrder: any | undefined = undefined;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    searchString: string = '';
    sortingParams: string = '';
    status: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    get orders() {
        return Array.from(this.orderRegistry.values());
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
        this.setPagingParams(new PagingParams(1));
    };

    setSortingParams = (sortingParams: string) => {
        this.sortingParams = sortingParams;
    };

    setStatus = (status: string) => {
        this.status = status;
    };

    loadOrders = async () => {
        this.loadingInitial = true;
        try {
            this.orderRegistry.clear();

            let result;

            if (this.status !== ''){
                result = await agent.Orders.getOrdersByStatus(this.axiosParams, this.status);
            } else {
                result = await agent.Orders.getOrders(this.axiosParams);
            }

            result.data.forEach((order) => {
                this.setOrder(order);
            });

            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };

    loadOrder = async (id: string) => {
        let order = this.getOrder(id);
        if (order) {
            this.selectedOrder = order;
            return order;
        } else {
            this.loadingInitial = true;
            try {
                order = (await agent.Orders.getOrder(id)) as any;
                this.setOrder(order);
                runInAction(() => {
                    this.selectedOrder = order;
                });
                this.setLoadingInitial(false);
                return order;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    };

    private setOrder = (order: any) => {
        this.orderRegistry.set(order.id, order);
    };

    private getOrder = (id: string) => {
        return this.orderRegistry.get(id);
    };

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    };

    clearSelectedOrder = () => {
        this.selectedOrder = undefined;
    };
}
