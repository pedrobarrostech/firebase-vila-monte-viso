import "reflect-metadata";
import {
    Change,
    EventContext
} from "firebase-functions";

import { firestore } from "firebase-admin";


export class AuthTriggerFirestore {

    static path: string = "auth/login";

    static async onAuth(snapshot: firestore.DocumentSnapshot, context?: EventContext) {

        const auth = snapshot.data();

        console.log(`[Auth] login -> ${auth}`);

    };

}

