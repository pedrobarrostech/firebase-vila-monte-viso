import { HttpError } from "routing-controllers";

export class SectionNotFoundError extends HttpError {

    constructor() {
        super(404, "Section not found!");
    }

}