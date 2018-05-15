import { firestore } from "firebase-admin";

import {
    Service,
    Inject,
} from "typedi";

import {
    User,
    UserEntity
} from "../user/model"

import { UserRepository } from "../user/repository";
import { AuthNotFoundError } from "./error"
import config from "../config"
import jwt from "express-jwt"
@Service()
export class AuthService {

    @Inject()
    userRepository: UserRepository;

    async login(user): Promise<firestore.DocumentSnapshot> {
        const data = await this.userRepository.findById("06316df2-72a2-4a9c-b03b-2ffff058af18");

        if (user.password === 250494) {
            const token = jwt.sign({
                username: 'data.username'
            }, config.jwtSecret)
        }

        if (!data.exists)
            throw new AuthNotFoundError();

        return data;
    }
}