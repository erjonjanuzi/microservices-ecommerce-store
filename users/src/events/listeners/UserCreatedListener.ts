import { Listener, Subjects, UserCreatedEvent } from "@labcourseapp/common";
import { Message } from "node-nats-streaming";
import { User } from "../../models/user";
import { queueGroupName } from "./queueGroupName";

export class UserCreatedListener extends Listener<UserCreatedEvent>{
    subject: Subjects.UserCreated = Subjects.UserCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: UserCreatedEvent['data'], msg: Message) {
        const {
            id,
            firstName,
            lastName,
            email,
            password,
            gender,
            phoneNumber,
            country,
            city,
            postalCode,
            street,
            role
        } = data;

        const user = User.build({
            id,
            firstName,
            lastName,
            email,
            password,
            gender,
            phoneNumber,
            country,
            city,
            postalCode,
            street,
            role
        });
        await user.save();

        msg.ack();
    }
}