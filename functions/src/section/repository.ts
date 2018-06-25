import { firestore } from "firebase-admin";
import { v4 as uuid } from "uuid";
import { Service } from "typedi";
import { QuerySnapshot } from "@google-cloud/firestore"


@Service()
export class SectionRepository {

    docRef = firestore().collection("sections");

    async findAll(): Promise<QuerySnapshot> {
        return this.docRef.get();
    }

    async save(name: string, info: string, description: string, image: string, imageRef: string): Promise<string> {

        const id = uuid();

        await this.docRef.doc(id).set({
            id,
            name,
            info,
            description,
            image,
            imageRef
        });

        return id;

    }

    async update(id: string, name: string, info: string, description: string, image: string, imageRef: string): Promise<void> {
        this.docRef.doc(id).update({
            id,
            name,
            info,
            description,
            image,
            imageRef
        });
    }

    async delete(id: string): Promise<void> {
        await this.docRef.doc(id).delete();
    }

    async findById(id: string): Promise<firestore.DocumentSnapshot> {
        return this.docRef.doc(id).get();
    }

}