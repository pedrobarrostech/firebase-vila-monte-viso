import "reflect-metadata";
import {
    Change,
    EventContext
} from "firebase-functions";

import { firestore } from "firebase-admin";


export class ClientTriggerFirestore {

    static path: string = "clients/{clientId}";

    static async onWrite(change: Change<firestore.DocumentSnapshot>, context?: EventContext) {

        const clientBefore = change.before.exists ? change.before.data() : null;
        const clientAfter = change.after.data();

        console.log(`[Client] onWrite after -> ${clientAfter} | before -> ${clientBefore}`);

    };

    static async onUpdate(change: Change<firestore.DocumentSnapshot>, context?: EventContext) {

        const clientBefore = change.before.data();
        const clientAfter = change.after.data();

        console.log(`[Client] update after -> ${clientAfter} | before -> ${clientBefore}`);


    };

    static async onCreate(snapshot: firestore.DocumentSnapshot, context?: EventContext) {

        const client = snapshot.data();

        console.log(`[Client] create -> ${client}`);

    };

    static async onDelete(snapshot: firestore.DocumentSnapshot, context?: EventContext) {

        const client = snapshot.data();

        console.log(`[Client] delete -> ${client}`);

    };

}

