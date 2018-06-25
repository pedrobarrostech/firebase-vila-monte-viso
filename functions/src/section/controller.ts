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

import { Section } from "./model"
import { SectionNotFoundError } from "./error"
import { SectionService } from "./service";
import * as admin from "firebase-admin";
@JsonController()
export class SectionController {

    @Inject()
    sectionService: SectionService;

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
            req.section = decodedIdToken;
            return next();
        }).catch((error) => {
            console.error('Error while verifying Firebase ID token:', error);
            res.status(403).send('Unauthorized');
        });
    })
    getAll() {
        return this.sectionService.findAll();
    }

    @Get("/:id")
    @OnUndefined(SectionNotFoundError)
    getOne(@Param("id") id: string) {
        return this.sectionService.findById(id);
    }

    @Post()
    save(@Body() section: Section) {
        return this.sectionService.save(section);
    }

    @Put("/:id")
    @OnUndefined(SectionNotFoundError)
    async update(@Param("id") id: string, @Body() section: Section) {
        return this.sectionService.update(id, section);
    }

    @Delete("/:id")
    @HttpCode(204)
    @OnUndefined(SectionNotFoundError)
    async delete(@Param("id") id: string) {
        await this.sectionService.delete(id);
        return "delete"
    }

}