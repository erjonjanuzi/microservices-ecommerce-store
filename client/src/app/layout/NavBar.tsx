import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Dropdown, Icon, Image, Label, Menu, Search, SearchProps } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import { history } from '../..';

export default observer(function NavBar() {
    const {
        userStore: { user, logout, isLoggedIn },
        cartStore,
        wishlistStore
    } = useStore();

    const [searchString, setSearchString] = useState('');

    const handleSearchChange = (
        _: React.MouseEvent<HTMLElement, MouseEvent>,
        data: SearchProps
    ) => {
        setSearchString(data.value!);
    };

    const handleSearchSubmit = () => {
        if (searchString === '')
            history.push('/products');
        else
            history.push('/products?search=' + searchString);
    };

    if (user && location.search.split('?')[1] === 'registerSuccess') {
        toast.success(`Welcome, ${user.firstName}`)
    }

    useEffect(() => {
        cartStore.getCart();
        wishlistStore.getWishlist();
    }, [])

    return (
        <>
            {user && !user.emailConfirmed && location.search.split('?')[1] === 'registerSuccess' &&
                <div style={{ backgroundColor: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='info circle' />
                    <p>Email verification link has been sent to your email {user.personalDetails.email}.</p>
                </div>
            }
            <Menu stackable secondary style={{ margin: '0px', padding: '30px 0', backgroundColor: 'white' }}>
                <Container>
                    <Menu.Header as={NavLink} exact to="/">
                        <Image src='https://res.cloudinary.com/dcfzd0pgt/image/upload/v1657451390/logos/logo-fit-transparent_r7gw4v.png' style={{ maxWidth: '200px' }} />
                    </Menu.Header>
                    <>
                        <Menu.Item style={{minWidth: '50%', marginLeft: 'auto'}}>   
                            <Formik
                                initialValues={{ searchString: '', error: null }}
                                onSubmit={handleSearchSubmit}
                            >
                                {({ handleSubmit }) => (
                                    <Form
                                        className="ui form"
                                        onSubmit={handleSubmit}
                                        autoComplete="off"
                                        style={{ minWidth: '100%' }}
                                    >
                                        <Search
                                            onSearchChange={handleSearchChange}
                                            value={searchString}
                                            placeholder="Search products or categories"
                                            showNoResults={false}
                                            fluid
                                        />
                                    </Form>
                                )}
                            </Formik>
                        </Menu.Item>
                        <Menu.Item position="right" as={NavLink} to="/cart">
                            <Icon name="cart" />
                            {cartStore.cart && cartStore.cart.products.length > 0
                                && <Label circular size='tiny' color='red' content={cartStore.cart.products.length} />}
                        </Menu.Item>
                        <Menu.Item as={NavLink} to="/wishlist">
                            <Icon name="heart" />
                            {wishlistStore.wishlist && wishlistStore.wishlist.products.length > 0
                                && <Label circular size='tiny' color='red' content={wishlistStore.wishlist.products.length} />}
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
        </>
    );
});
