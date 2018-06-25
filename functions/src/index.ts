
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


import {
    clientApp,
    ClientTriggerFirestore
} from "./client"


import {
    sectionApp,
    SectionTriggerFirestore
} from "./section"

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


export const clients = functions.https.onRequest(clientApp);

export const clientOnWrite = functions.firestore.document (ClientTriggerFirestore.path).onWrite(ClientTriggerFirestore.onWrite);
export const clientOnUpdate = functions.firestore.document(ClientTriggerFirestore.path).onUpdate(ClientTriggerFirestore.onUpdate);
export const clientOnCreate = functions.firestore.document(ClientTriggerFirestore.path).onCreate(ClientTriggerFirestore.onCreate);
export const clientOnDelete = functions.firestore.document(ClientTriggerFirestore.path).onDelete(ClientTriggerFirestore.onDelete);

export const sections = functions.https.onRequest(sectionApp);

export const sectionOnWrite = functions.firestore.document (SectionTriggerFirestore.path).onWrite(SectionTriggerFirestore.onWrite);
export const sectionOnUpdate = functions.firestore.document(SectionTriggerFirestore.path).onUpdate(SectionTriggerFirestore.onUpdate);
export const sectionOnCreate = functions.firestore.document(SectionTriggerFirestore.path).onCreate(SectionTriggerFirestore.onCreate);
export const sectionOnDelete = functions.firestore.document(SectionTriggerFirestore.path).onDelete(SectionTriggerFirestore.onDelete);


export const helloWorld = functions.https.onRequest(async (request, response) => {
    return "hello"
});