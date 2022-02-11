import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";

interface Store {
    userStore: UserStore;
    commonStore: CommonStore
}

export const store: Store = {
    userStore: new UserStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}