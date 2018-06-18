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
    order: number = 0;

    @IsNotEmpty()
    active: number = 0;

}

export class BannerEntity {

    id: string;
    name: string;
    image: string;
    order: number;
    active: number;

    constructor(id: string, name: string, password: string, order: number, active: number) {
        this.id = id;
        this.name = name;
        this.image = password;
        this.order = order;
        this.active;
    }

}