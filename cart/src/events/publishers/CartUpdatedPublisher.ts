import { Publisher, Subjects, CartUpdatedEvent } from "@labcourseapp/common";

export class CartUpdatedPublisher extends Publisher<CartUpdatedEvent>{
    readonly subject: Subjects.CartUpdated = Subjects.CartUpdated;
}