import { firestore } from "firebase-admin";
import { v4 as uuid } from "uuid";
import { Service } from "typedi";
import { QuerySnapshot } from "@google-cloud/firestore"


@Service()
export class MessageRepository {

    docRef = firestore().collection("messages");

    async findAll(): Promise<QuerySnapshot> {
        return this.docRef.get();
    }

    async save(title: string, subject: string, email: string, phone: string, message: string): Promise<string> {

        const id = uuid();

        await this.docRef.doc(id).set({
            id,
            title,
            subject,
            email,
            phone,
            message
        });

        return id;

    }

    async update(id: string, title: string, subject: string, email: string, phone: string, message: string): Promise<void> {
        this.docRef.doc(id).update({
            id,
            title,
            subject,
            email,
            phone,
            message
        });
    }

    async delete(id: string): Promise<void> {
        await this.docRef.doc(id).delete();
    }

    async findById(id: string): Promise<firestore.DocumentSnapshot> {
        return this.docRef.doc(id).get();
    }

}