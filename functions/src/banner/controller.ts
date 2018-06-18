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

import { Banner } from "./model"
import { BannerNotFoundError } from "./error"
import { BannerService } from "./service";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
@JsonController()
export class BannerController {

    @Inject()
    bannerService: BannerService;

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
            req.banner = decodedIdToken;
            return next();
        }).catch((error) => {
            console.error('Error while verifying Firebase ID token:', error);
            res.status(403).send('Unauthorized');
        });
    })
    getAll() {
        return this.bannerService.findAll();
    }

    @Get("/:id")
    @OnUndefined(BannerNotFoundError)
    getOne(@Param("id") id: string) {
        return this.bannerService.findById(id);
    }

    @Post()
    save(@Body() banner: Banner) {
        return this.bannerService.save(banner);
    }

    @Put("/:id")
    @OnUndefined(BannerNotFoundError)
    async update(@Param("id") id: string, @Body() banner: Banner) {
        return this.bannerService.update(id, banner);
    }

    @Delete("/:id")
    @HttpCode(204)
    @OnUndefined(BannerNotFoundError)
    async delete(@Param("id") id: string) {
        await this.bannerService.delete(id);
        return "delete"
    }

}