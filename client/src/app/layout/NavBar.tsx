import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Dropdown, Icon, Image, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer(function NavBar() {
    const {
        userStore: { user, logout, isLoggedIn },
    } = useStore();

    if (user && location.search.split('?')[1] === 'registerSuccess'){
        toast.success(`Welcome, ${user.firstName}`)
    }

    return (
        <Menu stackable secondary style={{ margin: '0px', padding: '30px 0', backgroundColor: 'white' }}>
            <Container>
                <Menu.Header as={NavLink} exact to="/">
                    <Image src='assets/logo-fit-transparent.png' style={{maxWidth: '200px'}} />
                </Menu.Header>
                <>
                    <Menu.Item as={NavLink} to="/products" name="Products" />
                    <Menu.Item position="right" as={NavLink} to="/cart">
                        <Icon name="cart" />
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/wishlist">
                        <Icon name="heart" />
                    </Menu.Item>
                    {isLoggedIn ? (
                        <Menu.Item>
                            <Dropdown
                                pointing="top left"
                                text={`Hello, ${user?.firstName}🚀`}
                            >
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        text="My Account"
                                        icon="user"
                                        as={NavLink}
                                        to='/account'
                                    />
                                    <Dropdown.Item
                                        onClick={logout}
                                        text="Logout"
                                        icon="power"
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                    ) : (
                        <Menu.Item
                            as={NavLink}
                            to="/login#tab=login"
                            name="Log in"
                        />
                    )}
                </>
            </Container>
        </Menu>
    );
});
