import { observer } from 'mobx-react-lite';
import { Dropdown, DropdownProps, Menu } from 'semantic-ui-react';
import { sortOptions } from '../../../app/common/options/sortOptions';
import { useStore } from '../../../app/stores/store';

export default observer(function CustomerSorter() {
    const { customerStore } = useStore();

    const handleSort = (_: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        customerStore.setSortingParams(data.value as string);
        customerStore.loadCustomers();
    };

    return (
        <>
            <Menu compact>
                <Dropdown text="Sort" options={sortOptions} simple item onChange={handleSort} />
            </Menu>
        </>
    );
});