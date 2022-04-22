import { createContext, useContext } from "react";
import CartStore from "./cartStore";
import CommonStore from "./commonStore";
import ProductStore from "./productStore";
import StaffStore from "./staffStore";
import UserStore from "./userStore";

interface Store {
    userStore: UserStore;
    commonStore: CommonStore;
    productStore: ProductStore;
    cartStore: CartStore;
    staffStore: StaffStore;
}

export const store: Store = {
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    productStore: new ProductStore(),
    cartStore: new CartStore(),
    staffStore: new StaffStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}