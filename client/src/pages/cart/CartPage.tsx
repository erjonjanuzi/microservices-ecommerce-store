import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button, Divider, Grid, Segment } from 'semantic-ui-react';
import { CartItem } from '../../app/models/cart';
import { useStore } from '../../app/stores/store';
import CartItemView from './CartItemView';

export default observer(function CartPage() {
    const {
        cartStore: { getCart, cart, removeProductFromCart },
    } = useStore();

    useEffect(() => {
        getCart();
    }, []);

    return (
        <>
            <h1>Your cart (3 items)</h1>
            <Grid>
                <Grid.Column width={10}>
                    <Segment>
                        {cart &&
                            cart.products.map((cartItem: CartItem) => {
                                return (
                                    <>
                                        <CartItemView cartItem={cartItem} />
                                        <Divider />
                                    </>
                                );
                            })}
                    </Segment>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Segment>
                        <h2>Order Summary</h2>
                    </Segment>
                </Grid.Column>
            </Grid>
        </>
    );
});
