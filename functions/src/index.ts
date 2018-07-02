
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

import {
    messageApp,
    MessageTriggerFirestore
} from "./message"

import {
    serviceApp,
    ServiceTriggerFirestore
} from "./service"

import {
    productApp,
    ProductTriggerFirestore
} from "./product"

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

export const messages = functions.https.onRequest(messageApp);

export const messageOnWrite =  functions.firestore.document(MessageTriggerFirestore.path).onWrite(MessageTriggerFirestore.onWrite);
export const messageOnUpdate = functions.firestore.document(MessageTriggerFirestore.path).onUpdate(MessageTriggerFirestore.onUpdate);
export const messageOnCreate = functions.firestore.document(MessageTriggerFirestore.path).onCreate(MessageTriggerFirestore.onCreate);
export const messageOnDelete = functions.firestore.document(MessageTriggerFirestore.path).onDelete(MessageTriggerFirestore.onDelete);

export const services = functions.https.onRequest(serviceApp);

export const serviceOnWrite =  functions.firestore.document(ServiceTriggerFirestore.path).onWrite(ServiceTriggerFirestore.onWrite);
export const serviceOnUpdate = functions.firestore.document(ServiceTriggerFirestore.path).onUpdate(ServiceTriggerFirestore.onUpdate);
export const serviceOnCreate = functions.firestore.document(ServiceTriggerFirestore.path).onCreate(ServiceTriggerFirestore.onCreate);
export const serviceOnDelete = functions.firestore.document(ServiceTriggerFirestore.path).onDelete(ServiceTriggerFirestore.onDelete);

export const products = functions.https.onRequest(productApp);

export const productOnWrite =  functions.firestore.document(ProductTriggerFirestore.path).onWrite (ProductTriggerFirestore.onWrite);
export const productOnUpdate = functions.firestore.document(ProductTriggerFirestore.path).onUpdate(ProductTriggerFirestore.onUpdate);
export const productOnCreate = functions.firestore.document(ProductTriggerFirestore.path).onCreate(ProductTriggerFirestore.onCreate);
export const productOnDelete = functions.firestore.document(ProductTriggerFirestore.path).onDelete(ProductTriggerFirestore.onDelete);

export const helloWorld = functions.https.onRequest(async (request, response) => {
    return "hello"
});