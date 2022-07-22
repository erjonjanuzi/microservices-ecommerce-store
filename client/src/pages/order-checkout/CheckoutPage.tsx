import { observer } from "mobx-react-lite";
import { Grid, Icon, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import CheckoutForm from "./CheckoutForm";
import CheckoutSummary from "./CheckoutSummary";
import GuestCheckoutForm from "./GuestCheckoutForm";

export default observer(function CheckoutPage() {
    const { userStore } = useStore();

    return (
        <>
            <div style={{ minHeight: '100vh', marginTop: '50px' }}>
                <h3><Icon name="lock" />Secure checkout</h3>
                <Grid>
                    <Grid.Column width={10}>
                        <Segment>
                            {userStore.user ? <CheckoutForm /> : <GuestCheckoutForm />}
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <CheckoutSummary />
                    </Grid.Column>
                </Grid>
            </div>
        </>
    )
});