import { Subjects, Publisher, OrderCancelledEvent } from "@labcourseapp/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}