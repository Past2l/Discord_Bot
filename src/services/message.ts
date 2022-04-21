import { Message } from "discord.js";
import { DeleteResult, EntityRepository, getCustomRepository, getRepository } from "typeorm";
import { MessageEntity } from "../entities/Message";
import { IWriteMessage } from "../types/message";
import { AttachmentService } from "./attachment";
import { MessageContentService } from "./messageContent";

@EntityRepository(MessageEntity)
export class MessageService {
    readonly MessageRepository = getRepository(MessageEntity);
    readonly AttachmentService = getCustomRepository(AttachmentService);
    readonly MessageContentService = getCustomRepository(MessageContentService);

    async get(id: number): Promise<MessageEntity | undefined> {
        const log = await this.MessageRepository.findOneBy({_id:id});
        return log;
    }

    async write(body: IWriteMessage): Promise<MessageEntity> {
        const newLog = this.MessageRepository.create({
            ...body,
        });
        return await this.MessageRepository.save(newLog);
    }

    async update(id: number, body: IWriteMessage) {
        return await this.MessageRepository.update(
            {
                _id: id,
            },
            {
                ...body,
            }
        );
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.MessageRepository.delete({
            _id: id,
        });
    }

    async getByMessage(message: Message): Promise<MessageEntity | undefined> {
        const log = await this.MessageRepository.findOneBy({id:message.id});
        return log;
    }

    async getByMessageID(id: string): Promise<MessageEntity | undefined> {
        const log = await this.MessageRepository.findOneBy({id:id});
        return log;
    }

    async writeByMessage(message: Message): Promise<MessageEntity> {
        const attachment = message.attachments.first();
        let isAttachment: boolean;
        if(attachment) {
            isAttachment = true;
            message.attachments.forEach(async v => await this.AttachmentService.writeByAttachment(v,message.id));
        } else isAttachment = false;
        const messageContent = await this.MessageContentService.writeByMessage(message);
        return await this.write({
            id: message.id,
            guild_id: message.guildId,
            channel_id: message.channelId,
            user_id: message.author.id,
            last_content: messageContent._id,
            created: message.createdTimestamp,
            attachment: isAttachment
        });
    }

    async updateByMessage(message: Message, body: IWriteMessage) {
        const newContent = await this.MessageContentService.writeByMessage(message);
        body.last_edited = message.editedTimestamp;
        body.last_content = newContent._id;
        return await this.MessageRepository.update(
            {
                id: message.id,
            },
            {
                ...body,
            }
        );
    }

    async deleteByMessage(message: Message): Promise<DeleteResult> {
        return await this.MessageRepository.delete({
            id: message.id,
        });
    }

    async deleteByMessageID(id: string): Promise<DeleteResult> {
        return await this.MessageRepository.delete({
            id: id,
        });
    }
}