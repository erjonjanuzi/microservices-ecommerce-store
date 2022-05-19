import { observer } from "mobx-react-lite";
import { Dropdown, DropdownProps, Menu } from "semantic-ui-react";
import { inventorySortOptions } from "../../../app/common/options/inventorySortOptions";
import { useStore } from "../../../app/stores/store";

export default observer(function InventoryProductsSorter() {
    const { inventoryStore } = useStore();

    const handleSort = (_: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        inventoryStore.setSortingParams(data.value as string);
        inventoryStore.loadProducts();
    };

    return (
        <>
            <Menu compact>
                <Dropdown text="Sort" options={inventorySortOptions} simple item onChange={handleSort} />
            </Menu>
        </>
    );
});