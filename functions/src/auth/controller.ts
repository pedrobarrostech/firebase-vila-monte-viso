import {
    JsonController,
    Get, Post, Put, Delete,
    Param,
    Body,
    HttpCode,
    OnUndefined
} from "routing-controllers";

import { Inject } from "typedi";

import { Auth } from "./model"
import { AuthNotFoundError } from "./error"
import { AuthService } from "./service";

@JsonController()
export class AuthController {

    @Inject()
    authService: AuthService;

    @Post()
    login(@Body() auth: Auth) {
        return this.authService.login(auth);
    }

}