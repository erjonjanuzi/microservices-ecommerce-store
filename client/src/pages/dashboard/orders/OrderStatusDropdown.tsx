import { observer } from "mobx-react-lite";
import { Dropdown, DropdownProps, Menu } from "semantic-ui-react";
import { orderSortOptions, orderStatusOptions } from "../../../app/common/options/orderSortOptions";
import { useStore } from "../../../app/stores/store";

export default observer(function OrderStatusDropdown() {
    const { orderStore } = useStore();

    const handleStatusChange = (_: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        orderStore.setStatus(data.value as string);
    };

    return (
        <>
            <Menu compact>
                <Dropdown text="Status" options={orderStatusOptions} simple item onChange={handleStatusChange} />
            </Menu>
        </>
    );
});