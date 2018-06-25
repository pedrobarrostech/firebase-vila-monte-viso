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

import { Client } from "./model"
import { ClientNotFoundError } from "./error"
import { ClientService } from "./service";
import * as admin from "firebase-admin";
@JsonController()
export class ClientController {

    @Inject()
    clientService: ClientService;

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
            req.client = decodedIdToken;
            return next();
        }).catch((error) => {
            console.error('Error while verifying Firebase ID token:', error);
            res.status(403).send('Unauthorized');
        });
    })
    getAll() {
        return this.clientService.findAll();
    }

    @Get("/:id")
    @OnUndefined(ClientNotFoundError)
    getOne(@Param("id") id: string) {
        return this.clientService.findById(id);
    }

    @Post()
    save(@Body() client: Client) {
        return this.clientService.save(client);
    }

    @Put("/:id")
    @OnUndefined(ClientNotFoundError)
    async update(@Param("id") id: string, @Body() client: Client) {
        return this.clientService.update(id, client);
    }

    @Delete("/:id")
    @HttpCode(204)
    @OnUndefined(ClientNotFoundError)
    async delete(@Param("id") id: string) {
        await this.clientService.delete(id);
        return "delete"
    }

}