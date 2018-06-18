import { HttpError } from "routing-controllers";

export class BannerNotFoundError extends HttpError {

    constructor() {
        super(404, "Banner not found!");
    }

}