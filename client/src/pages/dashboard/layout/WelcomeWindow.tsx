import { observer } from 'mobx-react-lite';
import { Button, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

interface Props {
    name: string;
}

export default observer(function WelcomeWindow({ name }: Props) {
    const { modalStore } = useStore();

    return (
        <div style={{padding: '30px'}}>
            <h1>Welcome, {name}</h1>
            <p>This is your personal dashboard space to complete your work around the store</p>
            <Image src="../assets/welcomewindow/sidebar.png" size='medium'/>
            <br />
            <p>Use the sidebar to navigate around the different parts of the dashboard</p>
            <Button positive content="Continue" onClick={modalStore.closeModal} />
        </div>
    );
});
