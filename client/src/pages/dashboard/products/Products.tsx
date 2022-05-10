import { observer } from 'mobx-react-lite';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AddProductForm from './AddProductForm';

export default observer(function Products() {
    const { drawerStore } = useStore();

    return (
        <>
            <h1>Products</h1>
            <Segment style={{ backgroundColor: '#1a1c23' }}>
                <Grid>
                    <Grid.Column width={10}></Grid.Column>
                    <Grid.Column width={6}>
                        <Button
                            positive
                            icon="plus"
                            content="New product"
                            onClick={() =>
                                drawerStore.openDrawer(<AddProductForm />, 'Add product')
                            }
                            fluid
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
        </>
    );
});
