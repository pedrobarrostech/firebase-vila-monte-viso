import "reflect-metadata";
import {
    Change,
    EventContext
} from "firebase-functions";

import { firestore } from "firebase-admin";


export class MessageTriggerFirestore {

    static path: string = "messages/{messageId}";

    static async onWrite(change: Change<firestore.DocumentSnapshot>, context?: EventContext) {

        const messageBefore = change.before.exists ? change.before.data() : null;
        const messageAfter = change.after.data();

        console.log(`[Message] onWrite after -> ${messageAfter} | before -> ${messageBefore}`);

    };

    static async onUpdate(change: Change<firestore.DocumentSnapshot>, context?: EventContext) {

        const messageBefore = change.before.data();
        const messageAfter = change.after.data();

        console.log(`[Message] update after -> ${messageAfter} | before -> ${messageBefore}`);


    };

    static async onCreate(snapshot: firestore.DocumentSnapshot, context?: EventContext) {

        const message = snapshot.data();

        console.log(`[Message] create -> ${message}`);

    };

    static async onDelete(snapshot: firestore.DocumentSnapshot, context?: EventContext) {

        const message = snapshot.data();

        console.log(`[Message] delete -> ${message}`);

    };

}

