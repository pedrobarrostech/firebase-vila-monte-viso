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
import { ClientController } from "./controller"

class ClientApp extends App {

    middleware(): Array<Function> {
        return [

        ];
    }

    controllers(): Array<Function> {
        return [
            ClientController,
        ];
    }

}

export const clientApp = new ClientApp().express