import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { useStore } from '../stores/store';

interface Props extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export default function PrivateRoute({ component: Component, ...rest }: Props) {
    const {
        userStore: { isLoggedIn, user },
    } = useStore();
    return (
        <Route
            {...rest}
            render={(props) =>
                // isLoggedIn && user.role === 'admin' ? (
                    // user.firstTimeAccess ? (
                        // <Redirect to="/updatepassword" />
                    // ) : (
                        <Component {...props} />
                    // )
                // ) : (
                    // <Redirect to="/" />
                // )
            }
        />
    );
}
