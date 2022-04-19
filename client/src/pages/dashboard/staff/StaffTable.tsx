import { observer } from 'mobx-react-lite';
import { Button, Icon, Menu, Table } from 'semantic-ui-react';

export default observer(function StaffTable() {
    return (
        <Table style={{ backgroundColor: '#1a1c23' }} inverted singleLine>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Joining date</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell textAlign="right">Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>Erjon Januzi</Table.Cell>
                    <Table.Cell>erjonjanuzi@gmail.com</Table.Cell>
                    <Table.Cell>04/10/2022</Table.Cell>
                    <Table.Cell>Admin</Table.Cell>
                    <Table.Cell textAlign="right">
                        <Button.Group>
                            <Button icon="edit outline" />
                            <Button icon="trash alternate outline" color="red" />
                        </Button.Group>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                </Table.Row>
            </Table.Body>

            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan="5">
                        <Menu floated="right" pagination>
                            <Menu.Item as="a" icon>
                                <Icon name="chevron left" />
                            </Menu.Item>
                            <Menu.Item as="a">1</Menu.Item>
                            <Menu.Item as="a" icon>
                                <Icon name="chevron right" />
                            </Menu.Item>
                        </Menu>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    );
});
