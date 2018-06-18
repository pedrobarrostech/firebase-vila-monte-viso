import { firestore } from "firebase-admin";

import {
    Service,
    Inject,
} from "typedi";

import {
    Banner,
    BannerEntity
} from "./model"

import { BannerRepository } from "./repository";
import { BannerNotFoundError } from "./error"

@Service()
export class BannerService {

    @Inject()
    bannerRepository: BannerRepository;

    async findAll(): Promise<BannerEntity[]> {

        const query = await this.bannerRepository.findAll();

        const banners = new Array<BannerEntity>()

        query.forEach((document) => {

            const doc = document.data();

            banners.push(
                new BannerEntity(doc.id, doc.name, doc.image, doc.order, doc.active)
            );

        });

        return banners;
    }

    async findById(id: string): Promise<BannerEntity> {

        const document = await this.find(id);

        const data = document.data();

        return new BannerEntity(data.id, data.name, data.image, data.order, data.active);

    }

    async save(banner: Banner): Promise<BannerEntity> {

        const id = await this.bannerRepository.save(
            banner.name,
            banner.image,
            banner.order,
            banner.active
        );


        return new BannerEntity(id, banner.name, banner.image, banner.order, banner.active);
    }

    async update(id: string, banner: Banner): Promise<BannerEntity> {

        await this.bannerRepository.update(
            id,
            banner.name,
            banner.image,
            banner.order,
            banner.active
        );

        return new BannerEntity(id, banner.name, banner.image, banner.order, banner.active);
    }

    async delete(id: string): Promise<void> {

        await this.find(id);

        return this.bannerRepository.delete(id);
    }

    private async find(id: string): Promise<firestore.DocumentSnapshot> {

        const document = await this.bannerRepository.findById(id);

        if (!document.exists)
            throw new BannerNotFoundError();

        return document;
    }

}