import { firestore } from "firebase-admin";

import {
    Service,
    Inject,
} from "typedi";

import {
    Product,
    ProductEntity
} from "./model"

import { ProductRepository } from "./repository";
import { ProductNotFoundError } from "./error"

@Service()
export class ProductService {

    @Inject()
    productRepository: ProductRepository;

    async findAll(): Promise<ProductEntity[]> {

        const query = await this.productRepository.findAll();

        const services = new Array<ProductEntity>()

        query.forEach((document) => {

            const doc = document.data();

            services.push(
                new ProductEntity(doc.id, doc.name, doc.info, doc.description, doc.link, doc.image, doc.imageRef, doc.active)
            );

        });

        return services;
    }

    async findById(id: string): Promise<ProductEntity> {

        const document = await this.find(id);

        const data = document.data();

        return new ProductEntity(data.id, data.name, data.info, data.description, data.link, data.image, data.imageRef, data.active);

    }

    async save(service: Product): Promise<ProductEntity> {
        const id = await this.productRepository.save(
            service.name,
            service.info,
            service.description,
            service.link,
            service.image,
            service.imageRef,
            service.active
        );


        return new ProductEntity(id, service.name, service.info, service.description, service.link, service.image, service.imageRef, service.active);
    }

    async update(id: string, service: Product): Promise<ProductEntity> {

        await this.productRepository.update(
            id,
            service.name,
            service.info,
            service.description,
            service.link,
            service.image,
            service.imageRef,
            service.active
        );

        return new ProductEntity(id, service.name, service.info, service.description, service.link, service.image, service.imageRef, service.active);
    }

    async delete(id: string): Promise<void> {

        await this.find(id);

        return this.productRepository.delete(id);
    }

    private async find(id: string): Promise<firestore.DocumentSnapshot> {

        const document = await this.productRepository.findById(id);

        if (!document.exists)
            throw new ProductNotFoundError();

        return document;
    }

}