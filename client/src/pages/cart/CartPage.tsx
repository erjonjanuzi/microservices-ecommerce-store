import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

export default observer(function CartPage() {
    const { cartStore: { getCart, cart, removeProductFromCart } } = useStore();

    useEffect(() => {
        getCart();
    }, []);

    return (
        <>
            <h1>Cart page</h1>
            {cart && cart.products.map((cartItem: any) => {
                return <div>
                    <h1>{cartItem.product.title}</h1>
                    <h2>{cartItem.product.price}</h2>
                    <h2>{cartItem.quantity}</h2>
                    <h1>{`${cartItem.quantity * cartItem.product.price}EUR`}</h1>
                    <Button content='Remove' onClick={() => removeProductFromCart(cartItem.product.id)} />
                </div>
            })}
        </>
    );
});
