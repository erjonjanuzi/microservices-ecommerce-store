import { observer } from "mobx-react-lite";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { history } from "../..";

export default observer(function CategoriesBar() {
    const { productStore} = useStore();
    const [active, setActive] = useState('');

    const handleCategoryChange = (category:string) => {
        productStore.setCategory(category);
        history.push('/products');
    }

    return (
        <>
            <Menu fluid widths={10} style={{margin: '0 !important'}} secondary pointing>
                <Container>
                    <Menu.Item active={productStore.category === 'all'} onClick={() => handleCategoryChange('all')}>
                        All
                    </Menu.Item>
                    <Menu.Item active={productStore.category === 'Phones'} onClick={() => handleCategoryChange('Phones')}>
                        Phones
                    </Menu.Item>
                    <Menu.Item active={productStore.category === 'PC'} onClick={() => handleCategoryChange('PC')}>
                        PC
                    </Menu.Item>
                    <Menu.Item active={productStore.category === 'Laptops'} onClick={() => handleCategoryChange('Laptops')}>
                        Laptops
                    </Menu.Item>
                    <Menu.Item active={productStore.category === 'Consoles'} onClick={() => handleCategoryChange('Consoles')}>
                        Gaming Consoles
                    </Menu.Item>
                    <Menu.Item active={productStore.category === 'TV'} onClick={() => handleCategoryChange('TV')}>
                        TV
                    </Menu.Item>
                    <Menu.Item active={productStore.category === 'Watches'} onClick={() => handleCategoryChange('Watches')}>
                        Smart Watches
                    </Menu.Item>
                    <Menu.Item active={productStore.category === 'Games'} onClick={() => handleCategoryChange('Games')}>
                        Video Games
                    </Menu.Item>
                    <Menu.Item active={productStore.category === 'Accessories'} onClick={() => handleCategoryChange('Accessories')}>
                        Accessories
                    </Menu.Item>
                    <Menu.Item active={productStore.category === 'Other'} onClick={() => handleCategoryChange('Other')}>
                        Other
                    </Menu.Item>
                </Container>
            </Menu>
        </>
    )
})