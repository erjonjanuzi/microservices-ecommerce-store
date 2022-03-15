import { Listener, CartUpdatedEvent, Subjects } from "@labcourseapp/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import { Cart } from "../../models/cart";

export class CartUpdatedListener extends Listener<CartUpdatedEvent>{
    subject: Subjects.CartUpdated = Subjects.CartUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: CartUpdatedEvent['data'], msg: Message) {
        const { id, userId, products, version, totalPrice } = data;

        const cart = Cart.build({
            id,
            products,
            totalPrice,
            version, 
            userId,
        });
        await cart.save();

        msg.ack();
    }
}