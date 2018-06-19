import { firestore } from "firebase-admin";
import { v4 as uuid } from "uuid";
import { Service } from "typedi";
import { QuerySnapshot } from "@google-cloud/firestore"


@Service()
export class BannerRepository {

    docRef = firestore().collection("banners");

    async findAll(): Promise<QuerySnapshot> {
        return this.docRef.get();
    }

    async save(name: string, image: string, imageRef: string, order: number, active: number): Promise<string> {

        const id = uuid();

        await this.docRef.doc(id).set({
            id,
            name,
            image,
            imageRef,
            order,
            active
        });

        return id;

    }

    async update(id: string, name: string, image: string, imageRef: string, order: number, active: number): Promise<void> {
        this.docRef.doc(id).update({
            id,
            name,
            image,
            imageRef,
            order,
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