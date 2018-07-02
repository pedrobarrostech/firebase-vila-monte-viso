import "reflect-metadata";
import {
    Change,
    EventContext
} from "firebase-functions";

import { firestore } from "firebase-admin";


export class ServiceTriggerFirestore {

    static path: string = "services/{serviceId}";

    static async onWrite(change: Change<firestore.DocumentSnapshot>, context?: EventContext) {

        const serviceBefore = change.before.exists ? change.before.data() : null;
        const serviceAfter = change.after.data();

        console.log(`[Service] onWrite after -> ${serviceAfter} | before -> ${serviceBefore}`);

    };

    static async onUpdate(change: Change<firestore.DocumentSnapshot>, context?: EventContext) {

        const serviceBefore = change.before.data();
        const serviceAfter = change.after.data();

        console.log(`[Service] update after -> ${serviceAfter} | before -> ${serviceBefore}`);


    };

    static async onCreate(snapshot: firestore.DocumentSnapshot, context?: EventContext) {

        const service = snapshot.data();

        console.log(`[Service] create -> ${service}`);

    };

    static async onDelete(snapshot: firestore.DocumentSnapshot, context?: EventContext) {

        const service = snapshot.data();

        console.log(`[Service] delete -> ${service}`);

    };

}

