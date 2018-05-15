import { HttpError } from "routing-controllers";

export class AuthNotFoundError extends HttpError {

    constructor() {
        super(404, "Authentication error!");
    }

}