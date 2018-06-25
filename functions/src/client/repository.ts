import { firestore } from "firebase-admin";
import { v4 as uuid } from "uuid";
import { Service } from "typedi";
import { QuerySnapshot } from "@google-cloud/firestore"


@Service()
export class ClientRepository {

    docRef = firestore().collection("clients");

    async findAll(): Promise<QuerySnapshot> {
        return this.docRef.get();
    }

    async save(
        name: string, 
        lastName: string,
        rg: string,
        cpf: string,
        maritalStatus: string,
        sex: string,
        city: string,
        address: string,
        state: string,
        phone: string,
        facebook: string,
        email: string,
        birthday: string,
        info: string): Promise<string> {

        const id = uuid();

        await this.docRef.doc(id).set({
            id,
            name,
            lastName,
            rg,
            cpf,
            maritalStatus,
            sex,
            city,
            address,
            state,
            phone,
            facebook,
            email,
            birthday,
            info
        });

        return id;

    }

    async update(
        id: string,
        name: string, 
        lastName: string,
        rg: string,
        cpf: string,
        maritalStatus: string,
        sex: string,
        city: string,
        address: string,
        state: string,
        phone: string,
        facebook: string,
        email: string,
        birthday: string,
        info: string
    ): Promise<void> {
        this.docRef.doc(id).update({
            id,
            name,
            lastName,
            rg,
            cpf,
            maritalStatus,
            sex,
            city,
            address,
            state,
            phone,
            facebook,
            email,
            birthday,
            info
        });
    }

    async delete(id: string): Promise<void> {
        await this.docRef.doc(id).delete();
    }

    async findById(id: string): Promise<firestore.DocumentSnapshot> {
        return this.docRef.doc(id).get();
    }

}
