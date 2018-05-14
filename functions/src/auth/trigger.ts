import "reflect-metadata";
import {
    Change,
    EventContext
} from "firebase-functions";

import { firestore } from "firebase-admin";

export class AuthTriggerFirestore {

    static path: string = "auths/{authId}";

    static async onWrite(change: Change<firestore.DocumentSnapshot>, context?: EventContext) {

        const authBefore = change.before.exists ? change.before.data() : null;
        const authAfter = change.after.data();

        console.log(`[Auth] onWrite after -> ${authAfter} | before -> ${authBefore}`);

    };

    static async onUpdate(change: Change<firestore.DocumentSnapshot>, context?: EventContext) {

        const authBefore = change.before.data();
        const authAfter = change.after.data();

        console.log(`[Auth] update after -> ${authAfter} | before -> ${authBefore}`);


    };

    static async onCreate(snapshot: firestore.DocumentSnapshot, context?: EventContext) {

        const auth = snapshot.data();

        console.log(`[Auth] create -> ${auth}`);

    };

    static async onDelete(snapshot: firestore.DocumentSnapshot, context?: EventContext) {

        const auth = snapshot.data();

        console.log(`[Auth] delete -> ${auth}`);

    };

}

