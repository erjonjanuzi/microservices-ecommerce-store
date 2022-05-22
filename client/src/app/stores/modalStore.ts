import { makeAutoObservable } from 'mobx';

interface Modal {
    open: boolean;
    body: JSX.Element | null;
    size: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen' | undefined;
    theme: 'white' | 'dark';
}

export default class ModalStore {
    modal: Modal = {
        open: false,
        body: null,
        size: 'mini',
        theme: 'dark'
    };

    constructor() {
        makeAutoObservable(this);
    }

    openModal = (
        content: JSX.Element,
        size?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen',
        theme: 'white' | 'dark' = 'dark'
    ) => {
        this.modal.open = true;
        this.modal.body = content;
        this.modal.size = size;
        this.modal.theme = theme;
    };

    closeModal = () => {
        this.modal.open = false;
        this.modal.body = null;
    };
}
