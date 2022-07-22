import { observer } from "mobx-react-lite";
import { Button, Icon, Image } from "semantic-ui-react";
import { history } from "../..";

export default observer(function OrderSuccess() {
    return (
        <>
            <div style={{ minHeight: '100vh', marginTop: '50px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h1><Icon color="green" name='check circle' />Order Successful</h1>
                    <h3>Check your email for confirmation and order details</h3>
                    <br />
                    <br />
                    <br />
                    <Image src='/assets/illustrations/order.svg' size='medium' />
                    <br />
                    <br />
                    <Button icon="home" secondary content="Return home" onClick={() => {
                        history.push('/')
                    }} />
                </div>
            </div>
        </>
    )
})