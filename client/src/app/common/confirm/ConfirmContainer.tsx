import { observer } from 'mobx-react-lite';
import { Confirm } from 'semantic-ui-react';
import { useStore } from '../../stores/store';

export default observer(function ConfirmContainer() {
    const { confirmStore } = useStore();

    return (
        <Confirm
            open={confirmStore.confirm.open}
            header={confirmStore.confirm.header}
            content={confirmStore.confirm.content}
            onCancel={confirmStore.closeConfirm}
            onConfirm={confirmStore.onConfirm}
        />
    );
});
