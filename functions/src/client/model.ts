import {
    IsNotEmpty
} from "class-validator";

export class Client {

    id: string;

    @IsNotEmpty()
    name: string = "";

    @IsNotEmpty()
    lastName: string = "";

    @IsNotEmpty()
    rg: string = "";

    @IsNotEmpty()
    cpf: string = "";

    @IsNotEmpty()
    maritalStatus: string = "";

    @IsNotEmpty()
    sex: string = "";

    @IsNotEmpty()
    city: string = "";

    @IsNotEmpty()
    address: string = "";

    @IsNotEmpty()
    state: string = "";

    @IsNotEmpty()
    phone: string = "";

    @IsNotEmpty()
    facebook: string = "";

    @IsNotEmpty()
    email: string = "";

    @IsNotEmpty()
    birthday: string = "";

    @IsNotEmpty()
    info: string = "";

}

export class ClientEntity {

    id: string;
    name: string;
    lastName: string;
    rg: string;
    cpf: string;
    maritalStatus: string;
    sex: string;
    city: string;
    address: string;
    state: string;
    phone: string;
    facebook: string;
    email: string;
    birthday: string;
    info: string;

    

    constructor(
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
        info: string) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.rg = rg;
        this.cpf = cpf;
        this.maritalStatus = maritalStatus;
        this.sex = sex;
        this.city = city;
        this.address = address;
        this.state = state;
        this.phone = phone;
        this.facebook = facebook;
        this.email = email;
        this.birthday = birthday;
        this.info = info;
    }

}