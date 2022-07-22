import { observer } from "mobx-react-lite";
import CheckoutSummary from "./CheckoutSummary";
import StripeCheckout from 'react-stripe-checkout';
import { useStore } from "../../app/stores/store";
import agent from "../../app/api/agent";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { history } from "../..";
import { Grid, Image, Loader } from "semantic-ui-react";

export default observer(function PayOrder() {
    const { checkoutStore, cartStore } = useStore();
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(false);

    const handlePayment = async (tokenId: string) => {
        setLoading(true);
        setTimeout(async () => {
            await agent.Payments.pay({ orderId: checkoutStore.orderInfo.orderId, token: tokenId })
                .then(() => {
                    cartStore.clearCart();
                    checkoutStore.checkoutProducts = undefined;
                    checkoutStore.orderInfo = undefined;
                    setLoading(false);

                    history.push('/orders?orderSuccess')
                })
        }, 2000
        )
    }

    useEffect(() => {
        (async () => {
            const order = await agent.Orders.getOrder(id);
            if (!order) {
                history.push('/')
            }
        })
    }, [])

    if (!checkoutStore.checkoutProducts || !checkoutStore.orderInfo || loading) return <div style={{ minHeight: '100vh', marginTop: '50px' }}>
        <Loader active /></div>

    return (
        <>
            <div style={{ minHeight: '100vh', marginTop: '50px' }}>
                <Grid>
                    <Grid.Column width={6}>
                        <Image src='/assets/illustrations/credit-card.svg' size='medium' />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <CheckoutSummary />
                        <StripeCheckout
                            stripeKey="pk_test_51KQRozLMGVWt4cnBpoqVhBov2BtLnfVqZHq8AYtVNoon5vj27FykeVsWolSUJG7L56bYPBWlTn1KBCsfh3lPLPFL00aXVFZesZ"
                            email={checkoutStore.orderInfo.email}
                            amount={checkoutStore.orderInfo.amount.toFixed(2) * 100}
                            currency='EUR'
                            token={({ id }) => handlePayment(id)}
                        />
                    </Grid.Column>
                </Grid>
            </div>
        </>
    )
})