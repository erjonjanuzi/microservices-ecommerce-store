import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Divider, Icon, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import CheckoutItemView from "./CheckoutItemView";

export default observer(function CheckoutSummary() {
    const { checkoutStore: { checkoutProducts, checkoutFromCart }, cartStore } = useStore();
    const [products, setProducts] = useState(true);

    useEffect(() => {
        if (!checkoutProducts){
            cartStore.getCart();
            if (cartStore.cart)
                checkoutFromCart(cartStore.cart!)
        }
    }, [cartStore.cart])

    return (
        <>
            <Segment>
                <h2>Order Summary</h2>
                <div style={{ display: 'flex' }} onClick={() => setProducts(!products)} className='pointer'>
                    <p><b>Products</b></p>
                    <Icon name={products ? 'angle up' : 'angle down'} />
                </div>
                {products &&
                    <div>
                        {checkoutProducts &&
                            checkoutProducts.products.map((cartItem, index) => {
                                return (
                                    <>
                                        <CheckoutItemView cartItem={cartItem} />
                                    </>
                                );
                            })}
                    </div>
                }
                <Divider />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>Subtotal</p>
                    <p>{`${checkoutProducts?.totalPrice.toFixed(2)} €`}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>Standard Delivery</p>
                    <p>00.00 €</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p><b>Total incl. VAT</b></p>
                    <p><b>{`${checkoutProducts?.totalPrice.toFixed(2)} €`}</b></p>
                </div>
            </Segment>
        </>
    )
})