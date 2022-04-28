import axios from 'axios';
import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import { Pagination, PagingParams } from '../models/pagination';
import { StaffFormValues, Staff } from '../models/staff';
import { store } from './store';

export default class StaffStore {
    staffRegistry = new Map<string, Staff>();
    selectedStaff: Staff | undefined = undefined;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();

    constructor() {
        makeAutoObservable(this);
    }

    get staff() {
        return Array.from(this.staffRegistry.values());
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    };

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        params.append('search', 'test erjon')
        return params;
    }

    loadAllStaff = async () => {
        this.loadingInitial = true;
        try {
            this.staffRegistry.clear();

            const result = await agent.Staff.all(this.axiosParams);
            result.data.forEach((staff) => {
                this.setStaff(staff);
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

    loadStaff = async (id: string) => {
        let staff = this.getStaff(id);
        if (staff) {
            this.selectedStaff = staff;
            return staff;
        } else {
            this.loadingInitial = true;
            try {
                staff = (await agent.Staff.details(id)) as Staff;
                this.setStaff(staff);
                runInAction(() => {
                    this.selectedStaff = staff;
                });
                this.setLoadingInitial(false);
                return staff;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    };

    createStaff = async (staff: StaffFormValues) => {
        try {
            if (staff == null) return null;

            const newStaff = await agent.Staff.create(staff);

            runInAction(() => {
                if (this.staff.length < this.pagination!.itemsPerPage) this.setStaff(newStaff);
                store.drawerStore.closeDrawer();
                toast.success('Admin created successfully');
            });
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        }
    };

    getStaffById = async (id: string) => {
        try {
            const staff = (await agent.Users.details(id)) as Staff;
            runInAction(() => {
                this.selectedStaff = staff;
            });
        } catch (error) {
            console.log(error);
        }
    };

    updateStaff = async (id: string, staff: StaffFormValues) => {
        try {
            const result = await agent.Staff.update(id, staff);
            runInAction(() => {
                if (result.id) {
                    let updatedStaff = { ...this.getStaff(result.id), ...result };
                    this.staffRegistry.set(result.id, updatedStaff as Staff);
                    this.selectedStaff = updatedStaff as Staff;
                }
                store.drawerStore.closeDrawer();
                toast.success('User updated successfully');
            });
        } catch (error) {
            console.log(error);
        }
    };

    deleteStaff = async (id: string) => {
        this.loading = true;
        try {
            await agent.Users.delete(id);
            runInAction(() => {
                this.loadAllStaff();
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

    private setStaff = (staff: Staff) => {
        this.staffRegistry.set(staff.id, staff);
    };

    private getStaff = (id: string) => {
        return this.staffRegistry.get(id);
    };

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    };

    clearSelectedStaff = () => {
        this.selectedStaff = undefined;
    };
}
