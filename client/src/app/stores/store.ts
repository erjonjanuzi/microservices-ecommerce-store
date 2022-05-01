import { createContext, useContext } from 'react';
import CartStore from './cartStore';
import CommonStore from './commonStore';
import ConfirmStore from './confirmStore';
import CustomerStore from './customerStore';
import DrawerStore from './drawerStore';
import ProductStore from './productStore';
import StaffStore from './staffStore';
import UserStore from './userStore';

interface Store {
    userStore: UserStore;
    commonStore: CommonStore;
    productStore: ProductStore;
    cartStore: CartStore;
    staffStore: StaffStore;
    drawerStore: DrawerStore;
    confirmStore: ConfirmStore;
    customerStore: CustomerStore;
}

export const store: Store = {
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    productStore: new ProductStore(),
    cartStore: new CartStore(),
    staffStore: new StaffStore(),
    drawerStore: new DrawerStore(),
    confirmStore: new ConfirmStore(),
    customerStore: new CustomerStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
