import { firestore } from "firebase-admin";

import {
    Service,
    Inject,
} from "typedi";

import {
    Section,
    SectionEntity
} from "./model"

import { SectionRepository } from "./repository";
import { SectionNotFoundError } from "./error"

@Service()
export class SectionService {

    @Inject()
    sectionRepository: SectionRepository;

    async findAll(): Promise<SectionEntity[]> {

        const query = await this.sectionRepository.findAll();

        const sections = new Array<SectionEntity>()

        query.forEach((document) => {

            const doc = document.data();

            sections.push(
                new SectionEntity(doc.id, doc.name, doc.info, doc.description, doc.image, doc.imageRef)
            );

        });

        return sections;
    }

    async findById(id: string): Promise<SectionEntity> {

        const document = await this.find(id);

        const data = document.data();

        return new SectionEntity(data.id, data.name, data.info, data.description, data.image, data.imageRef);

    }

    async save(section: Section): Promise<SectionEntity> {
        const id = await this.sectionRepository.save(
            section.name,
            section.info,
            section.description,
            section.image,
            section.imageRef
        );


        return new SectionEntity(id, section.name, section.info, section.description, section.image, section.imageRef);
    }

    async update(id: string, section: Section): Promise<SectionEntity> {

        await this.sectionRepository.update(
            id,
            section.name,
            section.info,
            section.description,
            section.image,
            section.imageRef
        );

        return new SectionEntity(id, section.name, section.info, section.description, section.image, section.imageRef);
    }

    async delete(id: string): Promise<void> {

        await this.find(id);

        return this.sectionRepository.delete(id);
    }

    private async find(id: string): Promise<firestore.DocumentSnapshot> {

        const document = await this.sectionRepository.findById(id);

        if (!document.exists)
            throw new SectionNotFoundError();

        return document;
    }

}