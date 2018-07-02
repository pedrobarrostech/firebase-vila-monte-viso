import { firestore } from "firebase-admin";
import { v4 as uuid } from "uuid";
import { Service } from "typedi";
import { QuerySnapshot } from "@google-cloud/firestore"


@Service()
export class ServiceRepository {

    docRef = firestore().collection("services");

    async findAll(): Promise<QuerySnapshot> {
        return this.docRef.get();
    }

    async save(name: string, info: string, description: string, link: string, image: string, imageRef: string, active: number): Promise<string> {

        const id = uuid();

        await this.docRef.doc(id).set({
            id,
            name,
            info,
            description,
            link,
            image,
            imageRef,
            active
        });

        return id;

    }

    async update(id: string, name: string, info: string, description: string, link: string, image: string, imageRef: string, active: number): Promise<void> {
        this.docRef.doc(id).update({
            id,
            name,
            info,
            description,
            link,
            image,
            imageRef,
            active
        });
    }

    async delete(id: string): Promise<void> {
        await this.docRef.doc(id).delete();
    }

    async findById(id: string): Promise<firestore.DocumentSnapshot> {
        return this.docRef.doc(id).get();
    }

}