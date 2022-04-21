import { Message } from "discord.js";
import { DeleteResult, EntityRepository, getCustomRepository, getRepository } from "typeorm";
import { MessageEntity } from "../entities/Message";
import { IWriteMessage } from "../types/message";
import { AttachmentService } from "./attachment";

@EntityRepository(MessageEntity)
export class MessageService {
    readonly MessageRepository = getRepository(MessageEntity);
    readonly AttachmentService = getCustomRepository(AttachmentService);

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

    async writeByMessage(message: Message): Promise<MessageEntity> {
        const attachment = message.attachments.first();
        let isAttachment: boolean;
        if(attachment) {
            isAttachment = true;
            message.attachments.forEach(async v => await this.AttachmentService.writeByAttachment(v,message.id));
        } else isAttachment = false;
        return await this.write({
            id: message.id,
            guild_id: message.guildId,
            channel_id: message.channelId,
            user_id: message.author.id,
            last_content: message.content,
            created: message.createdTimestamp,
            attachment: isAttachment
        });
    }

    async updateByMessageID(id: string, body: IWriteMessage) {
        return await this.MessageRepository.update(
            {
                id: id,
            },
            {
                ...body,
            }
        );
    }

    async deleteByMessageID(id: string): Promise<DeleteResult> {
        return await this.MessageRepository.delete({
            id: id,
        });
    }
}