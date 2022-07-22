import { Publisher, Subjects, PaymentCreatedEvent } from "@labcourseapp/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}