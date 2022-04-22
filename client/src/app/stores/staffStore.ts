import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { StaffFormValues, Staff } from "../models/staff";

export default class StaffStore {
    staffRegistry = new Map<string, Staff>();
    selectedStaff: Staff | undefined = undefined;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get staff() {
        return Array.from(this.staffRegistry.values())
    }

    loadAllStaff = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Staff.all() as Staff[];
            result.forEach(staff => {
                this.setStaff(staff);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadStaff = async (id: string) => {
        let staff = this.getStaff(id);
        if (staff) {
            this.selectedStaff = staff;
            return staff;
        } else {
            this.loadingInitial = true;
            try {
                staff = await agent.Staff.details(id) as Staff;
                this.setStaff(staff);
                runInAction(() => {
                    this.selectedStaff = staff;
                })
                this.setLoadingInitial(false);
                return staff;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    createStaff = async (staff: StaffFormValues) => {
        try {
            if (staff == null) return null;

            const newStaff = await agent.Staff.create(staff);

            runInAction(() => {
                this.setStaff(newStaff);
            })
        } catch (error) {
            console.log(error);
        }
    }

    private setStaff = (staff: Staff) => {
        this.staffRegistry.set(staff.id, staff);
    }

    private getStaff = (id: string) => {
        return this.staffRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    
    clearSelectedStaff = () => {
        this.selectedStaff = undefined;
    }
}