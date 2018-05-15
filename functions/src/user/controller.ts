import {
    JsonController,
    Get, Post, Put, Delete,
    UseBefore,
    Param,
    Body,
    HttpCode,
    OnUndefined
} from "routing-controllers";

import { Inject } from "typedi";

import { User } from "./model"
import { UserNotFoundError } from "./error"
import { UserService } from "./service";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
@JsonController()
export class UserController {

    @Inject()
    userService: UserService;

    @Get()
    @UseBefore((req, res, next) => {
        console.log('Check if request is authorized with Firebase ID token');

        if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))) {
            console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
                'Make sure you authorize your request by providing the following HTTP header:',
                'Authorization: Bearer <Firebase ID Token>',
                'or by passing a "__session" cookie.');
            res.status(403).send('Unauthorized');
            return;
        }

        let idToken;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            console.log('Found "Authorization" header');
            // Read the ID Token from the Authorization header.
            idToken = req.headers.authorization.split('Bearer ')[1];
        }

        admin.auth().verifyIdToken(idToken).then((decodedIdToken) => {
            console.log('ID Token correctly decoded', decodedIdToken);
            req.user = decodedIdToken;
            return next();
        }).catch((error) => {
            console.error('Error while verifying Firebase ID token:', error);
            res.status(403).send('Unauthorized');
        });
    })
    getAll() {
        return this.userService.findAll();
    }

    @Get("/:id")
    @OnUndefined(UserNotFoundError)
    getOne(@Param("id") id: string) {
        return this.userService.findById(id);
    }

    @Post()
    save(@Body() user: User) {
        return this.userService.save(user);
    }

    @Put("/:id")
    @OnUndefined(UserNotFoundError)
    async update(@Param("id") id: string, @Body() user: User) {
        return this.userService.update(id, user);
    }

    @Delete("/:id")
    @HttpCode(204)
    @OnUndefined(UserNotFoundError)
    async delete(@Param("id") id: string) {
        await this.userService.delete(id);
        return "delete"
    }

}