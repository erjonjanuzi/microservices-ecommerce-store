import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button, Divider, Grid, Loader, Segment } from 'semantic-ui-react';
import { CartItem } from '../../app/models/cart';
import { useStore } from '../../app/stores/store';
import CartItemView from './CartItemView';
import EmptyCartView from './EmptyCartView';
import VoucherRedeemForm from './VoucherRedeemForm';
import { history } from '../..'

export default observer(function CartPage() {
    const {
        cartStore: { getCart, cart },
        checkoutStore
    } = useStore();

    const handleCheckoutFromCart = () => {
        if (cart)
            checkoutStore.checkoutFromCart(cart);

        history.push('/checkout')
    }

    useEffect(() => {
        getCart();
    }, []);

    if (!cart) return <div style={{ minHeight: '100vh', marginTop: '50px' }}>
        <Loader active />
    </div>

    return (
        <>
            <div style={{ marginTop: '50px' }}></div>
            {cart.products.length === 0 ? <EmptyCartView /> : <>
                <h1>{`🛒Your cart (${cart.products.length} items)`}</h1>
                <Grid>
                    <Grid.Column width={10}>
                        <Segment>
                            {cart &&
                                cart.products.map((cartItem: CartItem, index) => {
                                    return (
                                        <>
                                            <CartItemView cartItem={cartItem} />
                                            {/* If last element do not display the divider */}
                                            {index !== cart.products.length - 1 && <Divider />}
                                        </>
                                    );
                                })}
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Segment>
                            <h2>Order Summary</h2>
                            <VoucherRedeemForm />
                            <Divider />
                            <p>Subtotal</p>
                            <p>{`${cart?.totalPrice.toFixed(2)}€`}</p>
                            <Button
                                secondary
                                content="Checkout"
                                icon='lock'
                                type="submit"
                                onClick={() => handleCheckoutFromCart()}
                                fluid
                            />
                        </Segment>
                    </Grid.Column>
                </Grid>
            </>}
            <div style={{ marginBottom: '300px' }}></div>
        </>
    );
});
