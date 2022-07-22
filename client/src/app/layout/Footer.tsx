import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { Button, Container, Divider, Grid, Header, Image, List, Segment } from "semantic-ui-react";

export default observer(function Footer() {
    return (
        <>
            <Segment inverted style={{ padding: '5em 0em', margin: '50px 0 0 0' }} vertical>
                <Container textAlign='center'>
                    <Grid columns={4} divided stackable inverted>
                        <Grid.Row>
                            <Grid.Column>
                                <Header inverted as='h4' content='Links' />
                                <List link inverted>
                                    <List.Item as={NavLink} to="/products">Products</List.Item>
                                    <List.Item as={NavLink} to="/cart">Cart</List.Item>
                                    <List.Item as={NavLink} to="/wishlist">Wishlist</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column>
                                <Header inverted as='h4' content='Account' />
                                <List link inverted>
                                    <List.Item as={NavLink} to="/login#tab=login">Login</List.Item>
                                    <List.Item as={NavLink} to="/login#tab=register">Register</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column>
                                <Header inverted as='h4' content='Socials' />
                                <List link inverted>
                                    <List.Item>Facebook</List.Item>
                                    <List.Item as='a'>Instagram</List.Item>
                                    <List.Item as='a'>TikTok</List.Item>
                                    <List.Item as='a'>Twitter</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column>
                                <Header inverted as='h4' content='Zebra51' />
                                <Button basic content='Shop all products' icon='shopping bag' />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Divider inverted section />
                    <Image src='https://res.cloudinary.com/dcfzd0pgt/image/upload/v1657451390/logos/logo-fit-transparent_r7gw4v.png' centered size='mini' />
                    <List horizontal inverted divided link size='small'>
                        <List.Item as='a' href='#'>
                            Site Map
                        </List.Item>
                        <List.Item as='a' href='#'>
                            Contact Us
                        </List.Item>
                        <List.Item as='a' href='#'>
                            Terms and Conditions
                        </List.Item>
                        <List.Item as='a' href='#'>
                            Privacy Policy
                        </List.Item>
                    </List>
                </Container>
            </Segment>
        </>
    )
})