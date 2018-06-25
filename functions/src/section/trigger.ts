import "reflect-metadata";
import {
    Change,
    EventContext
} from "firebase-functions";

import { firestore } from "firebase-admin";


export class SectionTriggerFirestore {

    static path: string = "sections/{sectionId}";

    static async onWrite(change: Change<firestore.DocumentSnapshot>, context?: EventContext) {

        const sectionBefore = change.before.exists ? change.before.data() : null;
        const sectionAfter = change.after.data();

        console.log(`[Section] onWrite after -> ${sectionAfter} | before -> ${sectionBefore}`);

    };

    static async onUpdate(change: Change<firestore.DocumentSnapshot>, context?: EventContext) {

        const sectionBefore = change.before.data();
        const sectionAfter = change.after.data();

        console.log(`[Section] update after -> ${sectionAfter} | before -> ${sectionBefore}`);


    };

    static async onCreate(snapshot: firestore.DocumentSnapshot, context?: EventContext) {

        const section = snapshot.data();

        console.log(`[Section] create -> ${section}`);

    };

    static async onDelete(snapshot: firestore.DocumentSnapshot, context?: EventContext) {

        const section = snapshot.data();

        console.log(`[Section] delete -> ${section}`);

    };

}

