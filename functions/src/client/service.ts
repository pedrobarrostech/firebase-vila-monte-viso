import { firestore } from "firebase-admin";

import {
    Service,
    Inject,
} from "typedi";

import {
    Client,
    ClientEntity
} from "./model"

import { ClientRepository } from "./repository";
import { ClientNotFoundError } from "./error"

@Service()
export class ClientService {

    @Inject()
    clientRepository: ClientRepository;

    async findAll(): Promise<ClientEntity[]> {

        const query = await this.clientRepository.findAll();

        const clients = new Array<ClientEntity>()

        query.forEach((document) => {

            const doc = document.data();

            clients.push(
                new ClientEntity(
                    doc.id, 
                    doc.name, 
                    doc.lastName,
                    doc.rg,
                    doc.cpf,
                    doc.maritalStatus,
                    doc.sex,
                    doc.city,
                    doc.address,
                    doc.state,
                    doc.phone,
                    doc.facebook,
                    doc.email,
                    doc.birthday,
                    doc.info
                )
            );

        });

        return clients;
    }

    async findById(id: string): Promise<ClientEntity> {

        const document = await this.find(id);

        const data = document.data();

        return new ClientEntity(
            data.id, 
            data.name, 
            data.lastName,
            data.rg,
            data.cpf,
            data.maritalStatus,
            data.sex,
            data.city,
            data.address,
            data.state,
            data.phone,
            data.facebook,
            data.email,
            data.birthday,
            data.info
        );

    }

    async save(client: Client): Promise<ClientEntity> {

        const id = await this.clientRepository.save(
            client.name, 
            client.lastName,
            client.rg,
            client.cpf,
            client.maritalStatus,
            client.sex,
            client.city,
            client.address,
            client.state,
            client.phone,
            client.facebook,
            client.email,
            client.birthday,
            client.info
        );

        return new ClientEntity(
            id, 
            client.name, 
            client.lastName,
            client.rg,
            client.cpf,
            client.maritalStatus,
            client.sex,
            client.city,
            client.address,
            client.state,
            client.phone,
            client.facebook,
            client.email,
            client.birthday,
            client.info
        );
    }

    async update(id: string, client: Client): Promise<ClientEntity> {

        await this.clientRepository.update(
            id,
            client.name, 
            client.lastName,
            client.rg,
            client.cpf,
            client.maritalStatus,
            client.sex,
            client.city,
            client.address,
            client.state,
            client.phone,
            client.facebook,
            client.email,
            client.birthday,
            client.info
        );

        return new ClientEntity(
            id,
            client.name, 
            client.lastName,
            client.rg,
            client.cpf,
            client.maritalStatus,
            client.sex,
            client.city,
            client.address,
            client.state,
            client.phone,
            client.facebook,
            client.email,
            client.birthday,
            client.info);
    }

    async delete(id: string): Promise<void> {

        await this.find(id);

        return this.clientRepository.delete(id);
    }

    private async find(id: string): Promise<firestore.DocumentSnapshot> {

        const document = await this.clientRepository.findById(id);

        if (!document.exists)
            throw new ClientNotFoundError();

        return document;
    }

}