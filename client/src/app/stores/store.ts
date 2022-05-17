import { createContext, useContext } from 'react';
import CartStore from './cartStore';
import CommonStore from './commonStore';
import ConfirmStore from './confirmStore';
import CustomerStore from './customerStore';
import DrawerStore from './drawerStore';
import InventoryStore from './inventoryStore';
import ModalStore from './modalStore';
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
    modalStore: ModalStore;
    inventoryStore: InventoryStore;
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
    modalStore: new ModalStore(),
    inventoryStore: new InventoryStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
