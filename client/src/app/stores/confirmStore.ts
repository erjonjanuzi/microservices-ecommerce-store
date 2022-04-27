import { makeAutoObservable } from 'mobx';

interface Confirm {
    open: boolean;
    onConfirm: any;
    params: any;
    header: string;
    content: string;
}

export default class ConfirmStore {
    confirm: Confirm = {
        open: false,
        onConfirm: null,
        params: null,
        header: '',
        content: '',
    };

    constructor() {
        makeAutoObservable(this);
    }

    openConfirm = (header: string, content: string, onConfirm: any, ...params: any) => {
        this.confirm.open = true;
        this.confirm.header = header;
        this.confirm.content = content;
        this.confirm.onConfirm = onConfirm;
        this.confirm.params = params;
    };

    onConfirm = () => {
        this.confirm.onConfirm(this.confirm.params);
    };

    closeConfirm = () => {
        this.confirm.open = false;
        this.confirm.onConfirm = null;
        this.confirm.params = null;
        this.confirm.content = '';
        this.confirm.header = '';
    };
}
