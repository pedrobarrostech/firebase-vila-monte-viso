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
import { SectionController } from "./controller"

class SectionApp extends App {

    middleware(): Array<Function> {
        return [

        ];
    }

    controllers(): Array<Function> {
        return [
            SectionController,
        ];
    }

}

export const sectionApp = new SectionApp().express