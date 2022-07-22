import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Divider, Grid, Icon, Segment, Step } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import CheckoutItemView from "../order-checkout/CheckoutItemView";

interface Props {
    order: any
}

export default observer(function OrderDetails({ order }: Props) {

    return (
        <>
            {order.status === 'cancelled' ?
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p><b>Status</b></p>
                    <p><b>CANCELLED</b></p>
                </div> : <Step.Group widths={3} size='tiny'>
                    <Step active={order.status === 'awaiting:delivery'}
                        completed={order.status === 'intransit' || order.status === 'delivered'}
                    >
                        <Icon name='hourglass half' />
                        <Step.Content>
                            <Step.Title>Awaiting Delivery</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step active={order.status === 'intransit'}
                        completed={order.status === 'delivered'}
                    >
                        <Icon name='truck' />
                        <Step.Content>
                            <Step.Title>In transit</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step completed={order.status === 'delivered'}>
                        <Icon name='home' />
                        <Step.Content>
                            <Step.Title>Delivered</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>}
            <div>
                {order.products.map((item: any) => {
                    return (
                        <>
                            <CheckoutItemView cartItem={item} />
                        </>
                    )
                })}
            </div>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p><b>Total price incl. VAT</b></p>
                <p><b>{`${order.totalPrice.toFixed(2)} €`}</b></p>
            </div>
            <Divider />
            <h4>Delivery Address</h4>
            <p>
                {order.contact.deliveryAddress.country}<br />
                {order.contact.deliveryAddress.city}<br />
                {order.contact.deliveryAddress.postCode}<br />
                {order.contact.deliveryAddress.street}<br />
            </p>
            <h4>Billing Address</h4>
            <p>
                {order.contact.billingAddress.country}<br />
                {order.contact.billingAddress.city}<br />
                {order.contact.billingAddress.postCode}<br />
                {order.contact.billingAddress.street}<br />
            </p>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p><b>Email</b></p>
                <p><b>{order.contact.email}</b></p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p><b>Phone Number</b></p>
                <p><b>{order.contact.phoneNumber}</b></p>
            </div>
        </>
    )
})