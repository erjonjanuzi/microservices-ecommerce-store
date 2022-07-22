import { ExpirationCompleteEvent, Subjects, Publisher } from "@labcourseapp/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}