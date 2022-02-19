import { makeAutoObservable, runInAction } from 'mobx';
import { history } from '../..';
import agent from '../api/agent';
import { store } from './store';

export default class UserStore {
    user: any = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: any) => {
        try {
            const user: any = await agent.Auth.login(creds);
            console.log('user at login userStore', user);
            store.commonStore.setToken(user.token);
            runInAction(() => (this.user = user));
            history.push('/testafterlogin');
        } catch (error) {
            throw error;
        }
    };

    logout = () => {
        this.user = null;
        history.push('/');
    };

    getUser = async () => {
        try {
            const user: any = await agent.Auth.current();
            store.commonStore.setToken(user.token);
            runInAction(() => (this.user = user));
        } catch (error) {
            console.log(error);
        }
    };

    checkPersonalDetails = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        try {
            await agent.Auth.checkPersonalDetails({ email, password });
        } catch (error) {
            throw error;
        }
    };

    register = async (personal: any, address: any) => {
        try {
            const registerObj = { ...personal, ...address };
            await agent.Auth.register(registerObj);
            history.push(`/login/registerSuccess?email=${personal.email}`);
        } catch (error) {
            throw error;
        }
    };
}
