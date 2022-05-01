import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { Customer } from "../models/customer";
import { Pagination, PagingParams } from "../models/pagination";
import { store } from "./store";

export default class CustomerStore {
    customerRegistry = new Map<string, Customer>();
    selectedCustomer: Customer | undefined = undefined;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    searchString: string = '';
    sortingParams: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    get customers() {
        return Array.from(this.customerRegistry.values());
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

    setSearchString = (searchString: string) => {
        this.searchString = searchString;
        this.setPagingParams(new PagingParams(1))
    };

    setSortingParams = (sortingParams: string) => {
        this.sortingParams = sortingParams;
    };

    loadCustomers = async () => {
        this.loadingInitial = true;
        try {
            this.customerRegistry.clear();

            const result = await agent.Customers.all(this.axiosParams);

            result.data.forEach((customer) => {
                this.setCustomer(customer);
            });

            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    };

    loadCustomer = async (id: string) => {
        let customer = this.getCustomer(id);
        if (customer) {
            this.selectedCustomer = customer;
            return customer;
        } else {
            this.loadingInitial = true;
            try {
                customer = (await agent.Customers.details(id)) as Customer;
                this.setCustomer(customer);
                runInAction(() => {
                    this.selectedCustomer = customer;
                });
                this.setLoadingInitial(false);
                return customer;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    };

    getCustomerById = async (id: string) => {
        try {
            const customer = (await agent.Users.details(id)) as Customer;
            runInAction(() => {
                this.selectedCustomer = customer;
            });
        } catch (error) {
            console.log(error);
        }
    };

    deleteCustomer = async (id: string) => {
        this.loading = true;
        try {
            await agent.Users.delete(id);
            runInAction(() => {
                this.loadCustomers();
                this.loading = false;
                store.confirmStore.closeConfirm();
                toast.success('User deleted successfully');
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    private setCustomer = (customer: Customer) => {
        this.customerRegistry.set(customer.id, customer);
    };

    private getCustomer = (id: string) => {
        return this.customerRegistry.get(id);
    };

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    };

    clearSelectedCustomer = () => {
        this.selectedCustomer = undefined;
    };
}
