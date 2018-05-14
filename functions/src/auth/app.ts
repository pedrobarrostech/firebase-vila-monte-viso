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
import { AuthController } from "./controller"

class AuthApp extends App {

    middleware(): Array<Function> {
        return [

        ];
    }

    controllers(): Array<Function> {
        return [
            AuthController,
        ];
    }

}

export const authApp = new AuthApp().express