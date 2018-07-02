import {
    IsNotEmpty
} from "class-validator";

export class Message {

    id: string;

    @IsNotEmpty()
    title: string = "";

    @IsNotEmpty()
    subject: string = "";

    @IsNotEmpty()
    email: string = "";

    @IsNotEmpty()
    phone: string = "";

    @IsNotEmpty()
    message: string = "";

}

export class MessageEntity {

    id: string;
    title: string;
    subject: string;
    email: string;
    phone: string;
    message: string;

    constructor(id: string, title: string, subject: string, email: string, phone: string, message: string) {
        this.id = id;
        this.title = title;
        this.subject = subject;
        this.email = email;
        this.phone = phone;
        this.message = message;
    }

}