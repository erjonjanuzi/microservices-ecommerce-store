import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { Button, Container, Icon, Menu, Segment } from 'semantic-ui-react';

export default observer(function NavBar() {
    return (
            <Menu stackable secondary pointing>
                <Container>
                    <Menu.Header as={NavLink} exact to="/">
                        Store Logo
                    </Menu.Header>
                    <>
                        <Menu.Item
                            as={NavLink}
                            to="/products"
                            name="Products"
                        />
                        <Menu.Item position='right' as={NavLink} to='/cart'>
                            <Icon name='cart' />
                        </Menu.Item>
                        <Menu.Item as={NavLink} to='/wishlist'>
                            <Icon name='heart' />
                        </Menu.Item>
                        <Menu.Item as={NavLink} to='/login' name='Log in' /> 
                    </>
                </Container>
            </Menu>
    );
});
