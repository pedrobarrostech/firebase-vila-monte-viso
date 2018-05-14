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

    @Get()
    getAll() {
        return this.authService.findAll();
    }

    @Get("/:id")
    @OnUndefined(AuthNotFoundError)
    getOne(@Param("id") id: string) {
        return this.authService.findById(id);
    }

    @Post()
    save(@Body() auth: Auth) {
        return this.authService.save(auth);
    }

    @Put("/:id")
    @OnUndefined(AuthNotFoundError)
    async update(@Param("id") id: string, @Body() auth: Auth) {
        return this.authService.update(id, auth);
    }

    @Delete("/:id")
    @HttpCode(204)
    @OnUndefined(AuthNotFoundError)
    async delete(@Param("id") id: string) {
        await this.authService.delete(id);
        return "delete"
    }

}