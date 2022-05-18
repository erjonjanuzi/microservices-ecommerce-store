import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {
    Button,
    Header,
    Icon,
    Image,
    Label,
    Loader,
    Pagination,
    PaginationProps,
    Segment,
    Table,
} from 'semantic-ui-react';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import AddProductForm from './AddProductForm';

export default observer(function InventoryTable() {
    const {
        drawerStore,
        inventoryStore: {
            loadProducts,
            setPagingParams,
            productRegistry,
            products,
            pagination,
            loadingInitial,
            searchString,
            setSearchString,
        },
        confirmStore,
    } = useStore();

    const onChange = (_: React.MouseEvent<HTMLAnchorElement>, pageInfo: PaginationProps) => {
        if (typeof pageInfo.activePage === 'string') return;

        setPagingParams(new PagingParams(pageInfo.activePage));
        loadProducts();
    };

    useEffect(() => {
        loadProducts().then(() => setSearchString(''));
    }, [productRegistry]);

    if (loadingInitial || !pagination) return <Loader active />;

    if (products.length === 0) {
        if (searchString !== '') {
            return <h1>{`No results found for "${searchString}"`}</h1>;
        } else {
            return (
                <Segment placeholder inverted style={{ backgroundColor: '#1a1c23' }}>
                    <Header icon>
                        <Icon name="close" />
                        No products added to the store yet.
                    </Header>
                    <Button
                        primary
                        onClick={() => drawerStore.openDrawer(<AddProductForm />, 'Add Product')}
                    >
                        Add Product
                    </Button>
                </Segment>
            );
        }
    }

    return (
        <>
            {searchString !== '' && <h1>{`Search results for "${searchString}"`}</h1>}
            <Table style={{ backgroundColor: '#1a1c23' }} inverted singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Image</Table.HeaderCell>
                        <Table.HeaderCell>Product Name</Table.HeaderCell>
                        <Table.HeaderCell>Category</Table.HeaderCell>
                        <Table.HeaderCell>Base Price</Table.HeaderCell>
                        <Table.HeaderCell>Sale Percentage</Table.HeaderCell>
                        <Table.HeaderCell>Discounted Price</Table.HeaderCell>
                        <Table.HeaderCell>Stock</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Details</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {products.map((product) => (
                        <Table.Row key={product.id}>
                            <Table.Cell>
                                <div
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        textAlign: 'center',
                                        backgroundColor: 'white',
                                        border: '1px solid #4d4f52',
                                    }}
                                >
                                    <img
                                        src={product.images[0].url}
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            verticalAlign: 'middle',
                                        }}
                                    />
                                </div>
                            </Table.Cell>
                            <Table.Cell>{product.title}</Table.Cell>
                            <Table.Cell>{product.category}</Table.Cell>
                            <Table.Cell>{`${product.price}€`}</Table.Cell>
                            <Table.Cell>{product.sale > 0 ? `${product.sale}%` : '-'}</Table.Cell>
                            <Table.Cell>
                                {product.sale > 0
                                    ? `${(
                                          product.price -
                                          product.price * (product.sale / 100)
                                      ).toFixed(2)}€`
                                    : '-'}
                            </Table.Cell>
                            <Table.Cell>{product.quantity}</Table.Cell>
                            <Table.Cell>
                                <Label
                                    content={product.quantity > 0 ? 'Selling' : 'Out of stock'}
                                    color={product.quantity > 0 ? 'green' : 'red'}
                                    circular
                                />
                            </Table.Cell>
                            <Table.Cell textAlign="center">
                                <Icon link onClick={() => console.log('view')} name="eye" />
                            </Table.Cell>
                            <Table.Cell textAlign="right">
                                <Button.Group>
                                    <Button
                                        icon="edit outline"
                                        onClick={() =>
                                            // TODO call edit product form here
                                            console.log('edit product')
                                        }
                                        content="Edit"
                                    />
                                    <Button
                                        icon="trash alternate outline"
                                        color="red"
                                        onClick={() =>
                                            // TODO call delete product here
                                            console.log('Delete product')
                                        }
                                    />
                                </Button.Group>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan="3" textAlign="left">
                            <p>{`Showing ${
                                pagination.currentPage * pagination.itemsPerPage -
                                pagination.itemsPerPage +
                                1
                            }-${
                                pagination.currentPage * pagination.itemsPerPage <
                                pagination.totalItems
                                    ? pagination.currentPage * pagination.itemsPerPage
                                    : pagination.currentPage * pagination.itemsPerPage -
                                      (pagination.currentPage * pagination.itemsPerPage -
                                          pagination.totalItems)
                            } of ${pagination.totalItems}`}</p>
                        </Table.HeaderCell>
                        <Table.HeaderCell colSpan="8" textAlign="right">
                            <Pagination
                                totalPages={pagination.totalPages}
                                onPageChange={onChange}
                                activePage={pagination.currentPage}
                                ellipsisItem={null}
                                firstItem={null}
                                lastItem={null}
                                size="mini"
                            />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </>
    );
});
