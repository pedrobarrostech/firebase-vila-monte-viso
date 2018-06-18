
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import {
    userApp,
    UserTriggerFirestore
} from "./user"

import {
    authApp,
    AuthTriggerFirestore
} from "./auth"

import {
    bannerApp,
    BannerTriggerFirestore
} from "./banner"

admin.initializeApp(functions.config().firebase);

export const auth = functions.https.onRequest(authApp);
export const users = functions.https.onRequest(userApp);

export const userOnWrite = functions.firestore.document(UserTriggerFirestore.path).onWrite(UserTriggerFirestore.onWrite);
export const userOnUpdate = functions.firestore.document(UserTriggerFirestore.path).onUpdate(UserTriggerFirestore.onUpdate);
export const userOnCreate = functions.firestore.document(UserTriggerFirestore.path).onCreate(UserTriggerFirestore.onCreate);
export const userOnDelete = functions.firestore.document(UserTriggerFirestore.path).onDelete(UserTriggerFirestore.onDelete);

export const banners = functions.https.onRequest(bannerApp);

export const bannerOnWrite = functions.firestore.document(BannerTriggerFirestore.path).onWrite(BannerTriggerFirestore.onWrite);
export const bannerOnUpdate = functions.firestore.document(BannerTriggerFirestore.path).onUpdate(BannerTriggerFirestore.onUpdate);
export const bannerOnCreate = functions.firestore.document(BannerTriggerFirestore.path).onCreate(BannerTriggerFirestore.onCreate);
export const bannerOnDelete = functions.firestore.document(BannerTriggerFirestore.path).onDelete(BannerTriggerFirestore.onDelete);


export const helloWorld = functions.https.onRequest(async (request, response) => {
    return "hello"
});