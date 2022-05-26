import { Message } from 'discord.js';
import {
    DeleteResult,
    EntityRepository,
    getCustomRepository,
    getRepository,
} from 'typeorm';
import { MessageEntity } from '../entities/Message';
import * as MessageType from '../types/message';
import { AttachmentService } from './attachment';
import { MessageContentService } from './messageContent';

@EntityRepository(MessageEntity)
export class MessageService {
    readonly MessageRepository = getRepository(MessageEntity);
    readonly MessageContentService = getCustomRepository(MessageContentService);
    readonly AttachmentService = getCustomRepository(AttachmentService);

    async get(id: string): Promise<MessageEntity | null> {
        const log = await this.MessageRepository.findOneBy({ id: id });
        return log;
    }

    async write(body: MessageType.Body): Promise<MessageEntity> {
        const newLog = this.MessageRepository.create({
            ...body,
        });
        return await this.MessageRepository.save(newLog);
    }

    async update(id: string, body: Partial<MessageType.Body>) {
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

    async getByMessage(message: Message): Promise<MessageEntity | null> {
        const log = await this.MessageRepository.findOneBy({ id: message.id });
        return log;
    }

    async getByMessageID(id: string): Promise<MessageEntity | null> {
        const log = await this.MessageRepository.findOneBy({ id: id });
        return log;
    }

    async writeByMessage({
        guild,
        channel,
        user,
        message,
    }: MessageType.Write): Promise<MessageEntity> {
        const attachment = message.attachments.first();
        let isAttachment: boolean = !!attachment;
        const res = await this.write({
            id: message.id,
            guild: guild,
            channel: channel,
            user: user,
            created: message.createdTimestamp,
            edited: message.editedTimestamp || undefined,
            attachment: isAttachment,
        });
        this.MessageContentService.write({
            guild: guild,
            channel: channel,
            user: user,
            message: res,
            created: message.editedTimestamp || message.createdTimestamp,
            content: message.content.length >= 0 ? message.content : undefined,
        });
        if (isAttachment)
            message.attachments.forEach(
                async (v) =>
                    await this.AttachmentService.writeByAttachment({
                        guild: guild,
                        channel: channel,
                        user: user,
                        message: res,
                        attachment: v,
                        content: message,
                    })
            );
        return res;
    }

    async updateByMessage(
        { guild, channel, user, message, content }: MessageType.Update,
        body: Partial<MessageType.Body>
    ) {
        if (!body.deleted)
            this.MessageContentService.write({
                guild: guild,
                channel: channel,
                user: user,
                message: message,
                created: content.editedTimestamp || content.createdTimestamp,
                content:
                    content.content.length >= 0 ? content.content : undefined,
            });
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
