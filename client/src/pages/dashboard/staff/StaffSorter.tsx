import { observer } from 'mobx-react-lite';
import { Dropdown, DropdownProps, Menu } from 'semantic-ui-react';
import { sortOptions } from '../../../app/common/options/sortOptions';
import { useStore } from '../../../app/stores/store';

export default observer(function StaffSorter() {
    const { staffStore } = useStore();

    const handleSort = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        staffStore.setSortingParams(data.value as string);
        staffStore.loadAllStaff();
    };

    return (
        <>
            <Menu compact>
                <Dropdown text="Sort" options={sortOptions} simple item onChange={handleSort} />
            </Menu>
        </>
    );
});
