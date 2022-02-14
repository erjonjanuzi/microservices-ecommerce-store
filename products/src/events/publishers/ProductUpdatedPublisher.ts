import { Publisher, ProductUpdatedEvent, Subjects } from "@labcourseapp/common";

export class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent>{
    readonly subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
}