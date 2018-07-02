import {
    IsNotEmpty
} from "class-validator";

export class Product {

    id: string;

    @IsNotEmpty()
    name: string = "";

    @IsNotEmpty()
    info: string = "";

    @IsNotEmpty()
    description: string = "";

    @IsNotEmpty()
    link: string = "";

    @IsNotEmpty()
    image: string = "";

    @IsNotEmpty()
    imageRef: string = "";

    @IsNotEmpty()
    active: number;

}

export class ProductEntity {

    id: string;
    name: string;
    info: string;
    description: string;
    link: string;
    image: string;
    imageRef: string;
    active: number;

    constructor(id: string, name: string, info: string, description: string, link: string, image: string, imageRef: string, active: number) {
        this.id = id;
        this.name = name;
        this.info = info;
        this.description = description;
        this.link = link;
        this.image = image;
        this.imageRef = imageRef;
        this.active = active;
    }

}