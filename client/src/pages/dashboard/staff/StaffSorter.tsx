import { observer } from 'mobx-react-lite';
import { Dropdown, DropdownProps, Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

const options = [
    { key: 1, text: 'A-Z', value: 'a-z' },
    { key: 2, text: 'Z-A', value: 'z-a' },
    { key: 3, text: 'Newest', value: 'newest' },
    { key: 4, text: 'Oldest', value: 'oldest' },
];

export default observer(function StaffSorter() {
    const { staffStore } = useStore();

    const handleSort = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        staffStore.setSortingParams(data.value as string);
        staffStore.loadAllStaff();
    };

    return (
        <>
            <Menu compact>
                <Dropdown text="Sort" options={options} simple item onChange={handleSort} />
            </Menu>
        </>
    );
});
