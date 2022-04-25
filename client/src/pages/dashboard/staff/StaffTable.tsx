import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Button, Icon, Menu, Table } from 'semantic-ui-react';
import { Staff } from '../../../app/models/staff';
import { useStore } from '../../../app/stores/store';
import EditStaffForm from './EditStaffForm';

interface Props {
    staff: Staff[];
}

export default observer(function StaffTable({ staff }: Props) {
    const {drawerStore, staffStore: {deleteStaff}} = useStore();

    return (
        <Table style={{ backgroundColor: '#1a1c23' }} inverted singleLine>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Joining date</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {staff.map((staff) => (
                    <Table.Row key={staff.id}>
                        <Table.Cell>{staff.firstName + ' ' + staff.lastName}</Table.Cell>
                        <Table.Cell>{staff.email}</Table.Cell>
                        <Table.Cell>{staff.createdAt}</Table.Cell>
                        <Table.Cell>{staff.role}</Table.Cell>
                        <Table.Cell textAlign="center">
                            <Button.Group>
                                <Button icon="edit outline" onClick={() => drawerStore.openDrawer(<EditStaffForm id={staff.id}/>)}/>
                                <Button icon="trash alternate outline" color="red" onClick={() => deleteStaff(staff.id)}/>
                            </Button.Group>
                        </Table.Cell>
                    </Table.Row>
                ))}
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
