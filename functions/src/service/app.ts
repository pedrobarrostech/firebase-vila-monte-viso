import {
    Router,
    Request,
    Response
} from "express";

import {
    json,
    urlencoded
} from "body-parser"

import { App } from "../app"
import { ServiceController } from "./controller"

class ServiceApp extends App {

    middleware(): Array<Function> {
        return [

        ];
    }

    controllers(): Array<Function> {
        return [
            ServiceController,
        ];
    }

}

export const serviceApp = new ServiceApp().express