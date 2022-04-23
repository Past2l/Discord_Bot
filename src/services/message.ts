import { Message, TextChannel } from "discord.js";
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

    async get(id: string): Promise<MessageEntity | undefined> {
        const log = await this.MessageRepository.findOneBy({id:id});
        return log;
    }

    async write(body: IWriteMessage): Promise<MessageEntity> {
        const newLog = this.MessageRepository.create({
            ...body,
        });
        return await this.MessageRepository.save(newLog);
    }

    async update(id: string, body: IWriteMessage) {
        return await this.MessageRepository.update(
            {
                id: id,
            },
            {
                ...body,
            }
        );
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.MessageRepository.delete({
            id: id,
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

    async writeByMessage(message: Message, content_id: number): Promise<MessageEntity> {
        const attachment = message.attachments.first();
        let isAttachment: boolean;
        if(attachment) {
            isAttachment = true;
            message.attachments.forEach(async v => await this.AttachmentService.writeByAttachment(v,message));
        } else isAttachment = false;
        const messageContent = await this.MessageContentService.get(content_id);
        const channel = message.channel as TextChannel;
        return await this.write({
            id: message.id,
            guild_name: message.guild.name,
            channel_name: channel.name,
            guild_id: message.guildId,
            channel_id: message.channelId,
            user_id: message.author.id,
            last_content_id: messageContent.id,
            last_content_date: message.editedTimestamp | message.createdTimestamp,
            last_content: messageContent.content ? messageContent.content : null,
            created: message.createdTimestamp,
            attachment: isAttachment
        });
    }

    async updateByMessage(message: Message, body: IWriteMessage) {
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
}