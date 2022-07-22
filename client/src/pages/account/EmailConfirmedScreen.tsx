import { observer } from "mobx-react-lite";
import { Button, Image } from "semantic-ui-react";
import { history } from "../..";

export default observer(function EmailConfirmedScreen() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Image src='/assets/illustrations/email-confirmed.svg' size='large' />
            <br />
            <h1>Your email has been confirmed</h1>
            <Button icon="home" secondary content="Continue" onClick={() => {
                history.push('/')
            }} />
        </div>
    )
})