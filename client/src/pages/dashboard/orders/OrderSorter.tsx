import { observer } from "mobx-react-lite";
import { Dropdown, DropdownProps, Menu } from "semantic-ui-react";
import { orderSortOptions } from "../../../app/common/options/orderSortOptions";
import { useStore } from "../../../app/stores/store";

export default observer(function OrderSorter() {
    const { orderStore } = useStore();

    const handleSort = (_: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        orderStore.setSortingParams(data.value as string);
        orderStore.loadOrders();
    };

    return (
        <>
            <Menu compact>
                <Dropdown text="Sort" options={orderSortOptions} simple item onChange={handleSort} />
            </Menu>
        </>
    );
});