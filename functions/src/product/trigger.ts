import "reflect-metadata";
import {
    Change,
    EventContext
} from "firebase-functions";

import { firestore } from "firebase-admin";


export class ProductTriggerFirestore {

    static path: string = "products/{productId}";

    static async onWrite(change: Change<firestore.DocumentSnapshot>, context?: EventContext) {

        const productBefore = change.before.exists ? change.before.data() : null;
        const productAfter = change.after.data();

        console.log(`[Product] onWrite after -> ${productAfter} | before -> ${productBefore}`);

    };

    static async onUpdate(change: Change<firestore.DocumentSnapshot>, context?: EventContext) {

        const productBefore = change.before.data();
        const productAfter = change.after.data();

        console.log(`[Product] update after -> ${productAfter} | before -> ${productBefore}`);


    };

    static async onCreate(snapshot: firestore.DocumentSnapshot, context?: EventContext) {

        const product = snapshot.data();

        console.log(`[Product] create -> ${product}`);

    };

    static async onDelete(snapshot: firestore.DocumentSnapshot, context?: EventContext) {

        const product = snapshot.data();

        console.log(`[Product] delete -> ${product}`);

    };

}

