import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import Sidebar from './Sidebar';

export default observer(function Dashboard() {
    return (
        <>
            <Grid>
                <Grid.Column width={3}>
                    <Sidebar />
                </Grid.Column>
                <Grid.Column width={13}>
                    <h1>dashboard goes here hahaha</h1>
                </Grid.Column>
            </Grid>
        </>
    );
});
