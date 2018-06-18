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
import { BannerController } from "./controller"

class BannerApp extends App {

    middleware(): Array<Function> {
        return [

        ];
    }

    controllers(): Array<Function> {
        return [
            BannerController,
        ];
    }

}

export const bannerApp = new BannerApp().express