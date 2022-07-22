import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Breadcrumb, Grid, Icon, Loader, Menu } from 'semantic-ui-react';
import { PagingParams } from '../../app/models/pagination';
import { useStore } from '../../app/stores/store';
import InfiniteScroll from 'react-infinite-scroller';
import ProductList from './ProductList';
import { useLocation } from 'react-router-dom';
import ProductSearchScreen from './ProductSearchScreen';
import Manufacturers from './Manufacturers';

export default observer(function Products() {
    const {
        productStore: { loadProducts, productRegistry, products, setPagingParams, pagination,
            loadingInitial, category, setSortingParams, sortingParams,
            manufacturers, setManufacturers
        },
    } = useStore();
    const [loadingNext, setLoadingNext] = useState(false);
    const location = useLocation();

    const sections = [
        { key: '/', content: 'Home', link: true },
        { key: '/products', content: 'Products', link: true },
        { key: 'Category', content: category, link: false }
    ]

    function handleGetNext() {
        setLoadingNext(true);
        // @ts-ignore
        setPagingParams(new PagingParams(parseInt(pagination!.currentPage) + 1))
        loadProducts().then(() => setLoadingNext(false));
    }

    const handleSort = (sort: string) => {
        setSortingParams(sort);
    }

    useEffect(() => {
        if (productRegistry.size <= 1) loadProducts();
    }, [productRegistry.size, loadProducts, category, sortingParams]);

    if (location.search !== '') return <div style={{ margin: '20px 0', minHeight: '100vh' }}><ProductSearchScreen /></div>

    return (
        <>
            <div style={{ margin: '20px 0' }}>
                <Breadcrumb icon='right angle' sections={sections} />
            </div>
            <Grid>
                <Grid.Column width={4}>
                        <Menu vertical className='sortBy'>
                            <Menu.Item header><Icon name='sort amount down'/>Sort by</Menu.Item>
                            <Menu.Item
                                name='relevance'
                                active={sortingParams === 'relevance'}
                                onClick={() => handleSort('')}
                            />
                            <Menu.Item
                                name='Price: Low to High'
                                active={sortingParams === 'low'}
                                onClick={() => handleSort('low')}
                            />
                            <Menu.Item
                                name='Price: High to Low'
                                active={sortingParams === 'high'}
                                onClick={() => handleSort('high')}
                            />
                        </Menu>
                        <Manufacturers />
                </Grid.Column>
                <Grid.Column width={12}>
                    {(loadingInitial && !loadingNext) ? <Loader active /> :
                        <InfiniteScroll
                            initialLoad={false}
                            pageStart={0}
                            loadMore={handleGetNext}
                            hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                        >
                            <ProductList />
                        </InfiniteScroll>
                    }
                </Grid.Column>
                <Grid.Column width={4}></Grid.Column>
                <Grid.Column width={12}>
                    <div style={{margin: '20px 0'}}>
                        <Loader active={loadingNext} />
                    </div>
                </Grid.Column>
            </Grid>
        </>
    );
});
