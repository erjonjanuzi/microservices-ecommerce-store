import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button, Header, Icon, Loader, Pagination, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import EditCategoryForm from './EditCategoryForm';

export default observer(function CategoriesTable() {
    const {
        categoryStore: {
            loadCategories,
            categoryRegistry,
            categories,
            loadingInitial,
            deleteCategory
        },
        confirmStore,
        drawerStore
    } = useStore();

    useEffect(() => {
        if (categoryRegistry.size <= 1) loadCategories();
    }, [categoryRegistry.size, loadCategories])

    if (loadingInitial) return <Loader active />;

    if (categories.length === 0) {
        return (
            <Segment placeholder inverted style={{ backgroundColor: '#1a1c23' }}>
                <Header icon>
                    <Icon name="close" />
                    No categories registered yet.
                </Header>
            </Segment>
        );
    }

    return (
        <>
            <Table style={{ backgroundColor: '#1a1c23' }} inverted singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Date created</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {categories.map((category) => (
                        <Table.Row key={category.id}>
                            <Table.Cell>{category.categoryName}</Table.Cell>
                            <Table.Cell>{new Date(category.createdAt).toDateString()}</Table.Cell>
                            <Table.Cell textAlign="right">
                                <Button.Group>
                                    <Button
                                        icon="edit outline"
                                        onClick={() =>
                                            drawerStore.openDrawer(<EditCategoryForm id={category.id} />, 'Edit category')
                                        }
                                    />
                                    <Button
                                        icon="trash alternate outline"
                                        color="red"
                                        onClick={() =>
                                            confirmStore.openConfirm(
                                                'This action is irreversible',
                                                'Are you sure you want to delete this category?',
                                                deleteCategory,
                                                category.id
                                            )
                                        }
                                    />
                                </Button.Group>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan="2" textAlign="left">
                            <p>1-10 of 10</p>
                        </Table.HeaderCell>
                        <Table.HeaderCell colSpan="3" textAlign="right">
                            <Pagination
                                totalPages={1}
                                activePage={1}
                                ellipsisItem={null}
                                firstItem={null}
                                lastItem={null}
                                size='mini'
                            />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </>
    );
});
