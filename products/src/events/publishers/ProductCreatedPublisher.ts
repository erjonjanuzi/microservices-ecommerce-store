import { Publisher, Subjects, ProductCreatedEvent } from "@labcourseapp/common";

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent>{
    readonly subject: Subjects.ProductCreated = Subjects.ProductCreated;
}