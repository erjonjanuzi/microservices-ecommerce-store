import { makeAutoObservable, runInAction } from 'mobx';
import { history } from '../..';
import agent from '../api/agent';
import { UpdateCustomerFormValues } from '../models/customer';
import { store } from './store';

export default class UserStore {
    user: any = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: any) => {
        try {
            const result = (await agent.Auth.login(creds)) as {
                email: string;
                id: string;
            };
            const user = (await agent.Users.details(result.id)) as any;
            runInAction(() => (this.user = user));

            if (user.role === 'admin' && user.firstTimeAccess === true) {
                history.push('/updatepassword');
                return;
            }

            user.role === 'admin' ? history.push('/dashboard/overview') : history.push('/');
        } catch (error) {
            throw error;
        }
    };

    logout = async () => {
        try {
            await agent.Auth.logout();
            this.user = null;
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    getUser = async () => {
        try {
            const result = (await agent.Auth.current()) as {
                currentUser: { id: string; email: string };
            };
            if (result.currentUser) {
                const user = await agent.Users.details(result.currentUser.id);
                runInAction(() => (this.user = user));
            }
        } catch (error) {
            console.log(error);
        }
    };

    checkPersonalDetails = async ({ email }: { email: string }) => {
        try {
            await agent.Auth.checkUser({ email });
        } catch (error) {
            throw error;
        }
    };

    register = async (personal: any, address: any) => {
        try {
            const registerObj = { ...personal, ...address };
            const user = await agent.Auth.register(registerObj);
            if (user) {
                runInAction(() => {
                    this.user = user;
                    history.push('/?registerSuccess');
                });
            }
        } catch (error) {
            throw error;
        }
    };

    updateCustomer = async(id: string, values: UpdateCustomerFormValues) => {
        try {
            const user = await agent.Customers.update(id, values);
            runInAction(() => {
                this.user = user;
            })
        } catch(error){
            throw error;
        }
    }

    deleteAccount = async () => {
        try {
            const result = await agent.Users.deleteAccount() as {delete: string};
            store.confirmStore.closeConfirm();
            if (result.delete === 'success'){
                this.logout();
            }
        } catch(error){
            throw error;
        }
    }

    updatePassword = async (values: { currentPassword: string; newPassword: string }) => {
        try {
            await agent.Users.changePassword(values);
        } catch (error) {
            throw error;
        }
    };

    forgotPassword = async (values: { email: string}) => {
        try {
            await agent.Users.forgotPassword(values)
        } catch (error){
            throw error
        }
    }

    resetPassword = async (values: {email: string, token: string, newPassword: string}) => {
        try {
            await agent.Users.resetPassword(values);
        } catch (error) {
            throw error
        }
    }
}
