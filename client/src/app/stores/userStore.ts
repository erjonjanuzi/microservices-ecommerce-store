import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { store } from "./store";

export default class UserStore {
    user: any = null;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: any) => {
        try {
            const user: any = await agent.Account.login(creds);
            console.log('user at login userStore', user);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/testafterlogin')
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        this.user = null;
        history.push('/');
    }

    getUser = async () => {
        try {
            const user: any = await agent.Account.current();
            console.log('User at getUser userStore', user);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }

    register = async (creds: any) => {
        try {
            await agent.Account.register(creds);
            history.push(`/account/registerSuccess?email=${creds.email}`);
        } catch (error) {
            throw error;
        }
    }
}