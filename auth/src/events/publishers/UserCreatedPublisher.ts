import { Publisher, Subjects, UserCreatedEvent } from "@labcourseapp/common";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent>{
    subject: Subjects.UserCreated = Subjects.UserCreated;
}