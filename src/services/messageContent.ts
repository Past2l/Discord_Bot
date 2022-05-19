import { Message } from "discord.js";
import { DeleteResult, EntityRepository, getRepository } from "typeorm";
import { MessageContentEntity } from "../entities/MessageContent";
import * as MessageContentType from "../types/messageContent";

@EntityRepository(MessageContentEntity)
export class MessageContentService {
    readonly MessageContentRepository = getRepository(MessageContentEntity);

    async get(id: number): Promise<MessageContentEntity | null> {
        const log = await this.MessageContentRepository.findOneBy({id:id});
        return log;
    }

    async write(body: MessageContentType.Body): Promise<MessageContentEntity> {
        const newMessageContent = this.MessageContentRepository.create({
            ...body,
        });
        return await this.MessageContentRepository.save(newMessageContent);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.MessageContentRepository.delete({
            id: id,
        });
    }

    async writeByMessage({ guild, channel, user, message, content }: MessageContentType.Write): Promise<MessageContentEntity> {
        return this.write({
            guild: guild,
            channel: channel,
            user: user,
            message: message,
            created: content.editedTimestamp || content.createdTimestamp,
            content: content.content.length <= 0 ? content.content : undefined
        });
    }
}