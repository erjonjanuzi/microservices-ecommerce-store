import { observer } from 'mobx-react-lite';
import { Container, Grid } from 'semantic-ui-react';
import Sidebar from './Sidebar';

export default observer(function Dashboard() {
    return (
        <>
            <div className="navbar">
                <h1>Ecommerce store name</h1>
            </div>
            <Sidebar />
            <div className='myScrollableDiv'>
                <Container>
                        <h1>dashboard goes here hahaha</h1>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                    
                </Container>
            </div>
        </>
    );
});
