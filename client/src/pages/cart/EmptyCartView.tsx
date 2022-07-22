import { observer } from "mobx-react-lite";
import { Button, Segment } from "semantic-ui-react";
import { history } from "../..";

export default observer(function EmptyCartView() {
    return (
        <>
            <div style={{ minHeight: '100vh', marginTop: '50px' }}>
                <Segment style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <h1>Your shopping cart 🛒 is <br /> empty 😔 - It's time to fill it up <br /> now!💻</h1>
                        <p>Do you already have an account? Great! Just log in to load your <br />
                            shopping cart. Otherwise sign up right away and enjoy the many <br />
                            benefits we offer our registered customers.</p>
                    </div>
                    <br />
                    <br />
                    <br />
                    <Button secondary content='Browse catalog of products' onClick={() => history.push('/products')} />
                </Segment>
            </div>
        </>
    )
})