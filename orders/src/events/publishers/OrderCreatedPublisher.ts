import { Publisher, OrderCreatedEvent, Subjects } from '@labcourseapp/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}