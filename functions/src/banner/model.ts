import {
    IsNotEmpty
} from "class-validator";

export class Banner {

    id: string;

    @IsNotEmpty()
    name: string = "";

    @IsNotEmpty()
    image: string = "";

    @IsNotEmpty()
    imageRef: string = "";

    @IsNotEmpty()
    order: number = 0;

    @IsNotEmpty()
    active: number = 0;

}

export class BannerEntity {

    id: string;
    name: string;
    image: string;
    imageRef: string;
    order: number;
    active: number;

    constructor(id: string, name: string, image: string, imageRef: string, order: number, active: number) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.imageRef = imageRef;
        this.order = order;
        this.active;
    }

}