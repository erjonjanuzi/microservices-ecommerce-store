import { makeAutoObservable } from 'mobx';

interface Drawer {
    open: boolean;
    body: JSX.Element | null;
    theme: 'white' | 'dark';
    header: string;
}

export default class DrawerStore {
    drawer: Drawer = {
        open: false,
        body: null,
        theme: 'dark',
        header: 'Title',
    };

    constructor() {
        makeAutoObservable(this);
    }

    openDrawer = (content: JSX.Element, header: string, theme: 'white' | 'dark' = 'dark') => {
        this.drawer.open = true;
        this.drawer.body = content;
        this.drawer.header = header;
        this.drawer.theme = theme;
    };

    closeDrawer = () => {
        this.drawer.open = false;
        this.drawer.body = null;
    };
}
