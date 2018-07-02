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

import { Message } from "./model"
import { MessageNotFoundError } from "./error"
import { MessageService } from "./service";
import * as admin from "firebase-admin";
@JsonController()
export class MessageController {

    @Inject()
    messageService: MessageService;

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
            req.message = decodedIdToken;
            return next();
        }).catch((error) => {
            console.error('Error while verifying Firebase ID token:', error);
            res.status(403).send('Unauthorized');
        });
    })
    getAll() {
        return this.messageService.findAll();
    }

    @Get("/:id")
    @OnUndefined(MessageNotFoundError)
    getOne(@Param("id") id: string) {
        return this.messageService.findById(id);
    }

    @Post()
    save(@Body() message: Message) {
        return this.messageService.save(message);
    }

    @Put("/:id")
    @OnUndefined(MessageNotFoundError)
    async update(@Param("id") id: string, @Body() message: Message) {
        return this.messageService.update(id, message);
    }

    @Delete("/:id")
    @HttpCode(204)
    @OnUndefined(MessageNotFoundError)
    async delete(@Param("id") id: string) {
        await this.messageService.delete(id);
        return "delete"
    }

}