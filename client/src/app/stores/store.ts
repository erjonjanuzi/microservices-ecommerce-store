import { createContext, useContext } from 'react';
import CartStore from './cartStore';
import CategoryStore from './categoryStore';
import CheckoutStore from './checkoutStore';
import CommonStore from './commonStore';
import ConfirmStore from './confirmStore';
import CustomerStore from './customerStore';
import DrawerStore from './drawerStore';
import InventoryStore from './inventoryStore';
import ModalStore from './modalStore';
import OrderStore from './orderStore';
import ProductStore from './productStore';
import StaffStore from './staffStore';
import UserStore from './userStore';
import WishlistStore from './wishlistStore';

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
    checkoutStore: CheckoutStore;
    wishlistStore: WishlistStore;
    orderStore: OrderStore;
    categoryStore: CategoryStore;
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
    checkoutStore: new CheckoutStore(),
    wishlistStore: new WishlistStore(),
    orderStore: new OrderStore(),
    categoryStore: new CategoryStore()
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
