import {
    JsonController,
    Get, Post, Put, Delete,
    Param,
    Body,
    HttpCode,
    OnUndefined
} from "routing-controllers";

import { Inject } from "typedi";

import { User } from "../user/model"
import { AuthNotFoundError } from "./error"
import { AuthService } from "./service";

@JsonController()
export class AuthController {

    @Inject()
    authService: AuthService;

    @Post()
    login(@Body() user: User) {
        return this.authService.login(user);
    }

}