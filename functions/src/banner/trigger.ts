import "reflect-metadata";
import {
    Change,
    EventContext
} from "firebase-functions";

import { firestore } from "firebase-admin";


export class BannerTriggerFirestore {

    static path: string = "banners/{bannerId}";

    static async onWrite(change: Change<firestore.DocumentSnapshot>, context?: EventContext) {

        const bannerBefore = change.before.exists ? change.before.data() : null;
        const bannerAfter = change.after.data();

        console.log(`[Banner] onWrite after -> ${bannerAfter} | before -> ${bannerBefore}`);

    };

    static async onUpdate(change: Change<firestore.DocumentSnapshot>, context?: EventContext) {

        const bannerBefore = change.before.data();
        const bannerAfter = change.after.data();

        console.log(`[Banner] update after -> ${bannerAfter} | before -> ${bannerBefore}`);


    };

    static async onCreate(snapshot: firestore.DocumentSnapshot, context?: EventContext) {

        const banner = snapshot.data();

        console.log(`[Banner] create -> ${banner}`);

    };

    static async onDelete(snapshot: firestore.DocumentSnapshot, context?: EventContext) {

        const banner = snapshot.data();

        console.log(`[Banner] delete -> ${banner}`);

    };

}

