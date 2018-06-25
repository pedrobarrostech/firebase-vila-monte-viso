import {
    IsNotEmpty
} from "class-validator";

export class Section {

    id: string;

    @IsNotEmpty()
    name: string = "";

    @IsNotEmpty()
    info: string = "";

    @IsNotEmpty()
    description: string = "";

    @IsNotEmpty()
    image: string = "";

    @IsNotEmpty()
    imageRef: string = "";

}

export class SectionEntity {

    id: string;
    name: string;
    info: string;
    description: string;
    image: string;
    imageRef: string;

    constructor(id: string, name: string, info: string, description: string, image: string, imageRef: string) {
        this.id = id;
        this.name = name;
        this.info = info;
        this.description = description;
        this.image = image;
        this.imageRef = imageRef;
    }

}