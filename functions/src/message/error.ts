import { HttpError } from "routing-controllers";

export class MessageNotFoundError extends HttpError {

    constructor() {
        super(404, "Message not found!");
    }

}