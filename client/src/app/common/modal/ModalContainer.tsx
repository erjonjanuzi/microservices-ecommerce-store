import { observer } from 'mobx-react-lite';
import { Modal } from 'semantic-ui-react';
import { useStore } from '../../stores/store';

export default observer(function ModalContainer() {
    const { modalStore } = useStore();

    return (
        <Modal
            open={modalStore.modal.open}
            onClose={modalStore.closeModal}
            size={modalStore.modal.size}
            className={modalStore.modal.theme === 'dark' ? 'dark-modal' : 'white-modal'}
        >
            <Modal.Content>{modalStore.modal.body}</Modal.Content>
        </Modal>
    );
});
