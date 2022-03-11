import { Publisher, Subjects, CartCreatedEvent } from "@labcourseapp/common";

export class CartCreatedPublisher extends Publisher<CartCreatedEvent>{
    readonly subject: Subjects.CartCreated = Subjects.CartCreated;
}