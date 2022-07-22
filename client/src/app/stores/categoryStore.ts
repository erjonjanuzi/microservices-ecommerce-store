import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { Category } from "../models/category";
import { store } from "./store";

export default class CategoryStore {
    categoryRegistry = new Map<string, Category>();
    selectedCategory: Category | undefined = undefined;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get categories() {
        return Array.from(this.categoryRegistry.values());
    }

    loadCategories = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Categories.all();

            result.forEach((category) => {
                this.setCategory(category);
            });

            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };

    loadCategory = async (id: string) => {
        let category = this.getCategory(id);
        if (category) {
            this.selectedCategory = category;
            return category;
        } else {
            this.loadingInitial = true;
            try {
                category = await agent.Categories.details(id);
                this.setCategory(category);
                runInAction(() => {
                    this.selectedCategory = category;
                });
                this.setLoadingInitial(false);
                return category;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    };

    createCategory = async (values: any) => {
        try {
            const newCategory = await agent.Categories.create(values);

            runInAction(() => {
                this.setCategory(newCategory);
            });
        } catch (error) {
            console.log(error);
        }
    };

    getCategoryById = async (id: string) => {
        try {
            const category = await agent.Categories.details(id);
            runInAction(() => {
                this.selectedCategory = category;
            });
        } catch (error) {
            console.log(error);
        }
    };

    editCategory = async (id: string, values: any) => {
        try {
            const result = await agent.Categories.update(id, values);
            runInAction(() => {
                if (result.id) {
                    let updatedCategory = { ...this.getCategory(result.id), ...result };
                    this.categoryRegistry.set(result.id, updatedCategory as Category);
                    this.selectedCategory = updatedCategory as Category;
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    deleteCategory = async (id: string) => {
        this.loading = true;
        try {
            await agent.Categories.delete(id);
            this.loadCategories();
            runInAction(() => {
                this.loading = false; 
                store.confirmStore.closeConfirm();
                toast.success('Category deleted');
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    private setCategory = (category: Category) => {
        this.categoryRegistry.set(category.id, category);
    };

    private getCategory = (id: string) => {
        return this.categoryRegistry.get(id);
    };

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    };

    clearSelectedCategory = () => {
        this.selectedCategory = undefined;
    };
}
