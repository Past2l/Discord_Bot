import { Message, TextChannel } from "discord.js";
import { DeleteResult, EntityRepository, getRepository } from "typeorm";
import { MessageContentEntity } from "../entities/MessageContent";
import { IWriteMessageContent } from "../types/messageContent";

@EntityRepository(MessageContentEntity)
export class MessageContentService {
    readonly MessageContentRepository = getRepository(MessageContentEntity);

    async get(id: number): Promise<MessageContentEntity | undefined> {
        const log = await this.MessageContentRepository.findOneBy({id:id});
        return log;
    }

    async write(body: IWriteMessageContent): Promise<MessageContentEntity> {
        const newMessageContent = this.MessageContentRepository.create({
            ...body,
        });
        return await this.MessageContentRepository.save(newMessageContent);
    }

    async update(id: number, body: IWriteMessageContent) {
        return await this.MessageContentRepository.update(
            {
                id: id,
            },
            {
                ...body,
            }
        );
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.MessageContentRepository.delete({
            id: id,
        });
    }

    async writeByMessage(message: Message): Promise<MessageContentEntity> {
        const channel = message.channel as TextChannel;
        return this.write({
            message_id: message.id,
            guild_name: message.guild.name,
            channel_name: channel.name,
            guild_id: message.guildId,
            channel_id: message.channelId,
            content: message.content,
            date: message.editedTimestamp | message.createdTimestamp
        });
    }
}