import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Divider, Grid, Header, Label, Loader, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

interface Props {
    id: string;
}

export default observer(function ViewCustomer({ id }: Props) {
    const {
        customerStore: { selectedCustomer, getCustomerById, clearSelectedCustomer },
    } = useStore();

    useEffect(() => {
        if (id) getCustomerById(id);
        return () => clearSelectedCustomer();
    }, [getCustomerById]);

    if (!selectedCustomer) return <Loader active />;

    return (
        <>
            <h1 style={{color: 'white'}}>Customer details</h1>
            <Divider />
            <Grid>
                <Grid.Column width={6} textAlign="center">
                    <Label
                        circular
                        content={selectedCustomer.firstName[0] + selectedCustomer.lastName[0]}
                        size="massive"
                        style={{
                            minWidth: '3em',
                            minHeight: '3em',
                            padding: '1.5em !important',
                            fontSize: '2rem',
                        }}
                        color="purple"
                    />
                    <h1>{`${selectedCustomer.firstName} ${selectedCustomer.lastName}`}</h1>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Table basic="very" inverted collapsing>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell textAlign="left">
                                    <Label basic content="Email" />
                                </Table.Cell>
                                <Table.Cell textAlign="left">{selectedCustomer.email}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign="left">
                                    <Label basic content="Phone number" />
                                </Table.Cell>
                                <Table.Cell textAlign="left">
                                    {selectedCustomer.personalDetails.phoneNumber}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign="left">
                                    <Label basic content="Address"/>
                                </Table.Cell>
                                <Table.Cell textAlign="left">{`${selectedCustomer.address.street}, ${selectedCustomer.address.city} ${selectedCustomer.address.postalCode}, ${selectedCustomer.address.country}`}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign="left">
                                    <Label basic content="Confirmed email" />
                                </Table.Cell>
                                <Table.Cell textAlign="left">{selectedCustomer.emailConfirmed ? 'Yes' : 'No'}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid>
            <h1>Orders</h1>
        </>
    );
});
