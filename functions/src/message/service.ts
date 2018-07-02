import { firestore } from "firebase-admin";

import {
    Service,
    Inject,
} from "typedi";

import {
    Message,
    MessageEntity
} from "./model"

import { MessageRepository } from "./repository";
import { MessageNotFoundError } from "./error"

@Service()
export class MessageService {

    @Inject()
    messageRepository: MessageRepository;

    async findAll(): Promise<MessageEntity[]> {

        const query = await this.messageRepository.findAll();

        const messages = new Array<MessageEntity>()

        query.forEach((document) => {

            const doc = document.data();

            messages.push(
                new MessageEntity(doc.id, doc.title, doc.subject, doc.email, doc.phone, doc.message)
            );
        });

        return messages;
    }

    async findById(id: string): Promise<MessageEntity> {

        const document = await this.find(id);

        const data = document.data();

        return new MessageEntity(data.id, data.title, data.subject, data.email, data.phone, data.message);

    }

    async save(message: Message): Promise<MessageEntity> {
        const id = await this.messageRepository.save(
            message.title,
            message.subject,
            message.email,
            message.phone,
            message.message
        );


        return new MessageEntity(id, message.title, message.subject, message.email, message.phone, message.message);
    }

    async update(id: string, message: Message): Promise<MessageEntity> {

        await this.messageRepository.update(
            id,
            message.title,
            message.subject,
            message.email,
            message.phone,
            message.message
        );

        return new MessageEntity(id, message.title, message.subject, message.email, message.phone, message.message);
    }

    async delete(id: string): Promise<void> {

        await this.find(id);

        return this.messageRepository.delete(id);
    }

    private async find(id: string): Promise<firestore.DocumentSnapshot> {

        const document = await this.messageRepository.findById(id);

        if (!document.exists)
            throw new MessageNotFoundError();

        return document;
    }

}