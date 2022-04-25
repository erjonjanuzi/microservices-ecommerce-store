import { makeAutoObservable } from "mobx"

interface Drawer {
    open: boolean;
    body: JSX.Element | null;
}

export default class DrawerStore {
    drawer: Drawer = {
        open: false,
        body: null
    }

    constructor() {
        makeAutoObservable(this)
    }

    openDrawer = (content: JSX.Element) => {
        this.drawer.open = true;
        this.drawer.body = content;
    }

    closeDrawer = () => {
        this.drawer.open = false;
        this.drawer.body = null;
    }
}