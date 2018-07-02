import { firestore } from "firebase-admin";

import {
    Service,
    Inject,
} from "typedi";

import {
    ServiceModel,
    ServiceEntity
} from "./model"

import { ServiceRepository } from "./repository";
import { ServiceNotFoundError } from "./error"

@Service()
export class ServiceService {

    @Inject()
    serviceRepository: ServiceRepository;

    async findAll(): Promise<ServiceEntity[]> {

        const query = await this.serviceRepository.findAll();

        const services = new Array<ServiceEntity>()

        query.forEach((document) => {

            const doc = document.data();

            services.push(
                new ServiceEntity(doc.id, doc.name, doc.info, doc.description, doc.link, doc.image, doc.imageRef, doc.active)
            );

        });

        return services;
    }

    async findById(id: string): Promise<ServiceEntity> {

        const document = await this.find(id);

        const data = document.data();

        return new ServiceEntity(data.id, data.name, data.info, data.description, data.link, data.image, data.imageRef, data.active);

    }

    async save(service: ServiceModel): Promise<ServiceEntity> {
        const id = await this.serviceRepository.save(
            service.name,
            service.info,
            service.description,
            service.link,
            service.image,
            service.imageRef,
            service.active
        );


        return new ServiceEntity(id, service.name, service.info, service.description, service.link, service.image, service.imageRef, service.active);
    }

    async update(id: string, service: ServiceModel): Promise<ServiceEntity> {

        await this.serviceRepository.update(
            id,
            service.name,
            service.info,
            service.description,
            service.link,
            service.image,
            service.imageRef,
            service.active
        );

        return new ServiceEntity(id, service.name, service.info, service.description, service.link, service.image, service.imageRef, service.active);
    }

    async delete(id: string): Promise<void> {

        await this.find(id);

        return this.serviceRepository.delete(id);
    }

    private async find(id: string): Promise<firestore.DocumentSnapshot> {

        const document = await this.serviceRepository.findById(id);

        if (!document.exists)
            throw new ServiceNotFoundError();

        return document;
    }

}