import { Channel, Message, TextChannel } from "discord.js";
import { DeleteResult, EntityRepository, getCustomRepository, getRepository } from "typeorm";
import { ChannelEntity } from "../entities/Channel";
import { IWriteChannel } from "../types/channel";
import { MessageContentService } from "./messageContent";

@EntityRepository(ChannelEntity)
export class ChannelService {
    readonly ChannelRepository = getRepository(ChannelEntity);
    readonly MessageContentService = getCustomRepository(MessageContentService);

    async get(id: string): Promise<ChannelEntity | null> {
        const channel = this.ChannelRepository.findOneBy({id:id});
        return channel;
    }

    async write(body: IWriteChannel): Promise<ChannelEntity> {
        const newChannel = this.ChannelRepository.create({
            ...body,
        });
        return await this.ChannelRepository.save(newChannel);
    }

    async update(id: string, body: IWriteChannel) {
        return await this.ChannelRepository.update(
            {
                id: id,
            },
            {
                ...body,
            }
        );
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.ChannelRepository.delete({
            id: id,
        });
    }

    async writeByChannel(channel: TextChannel): Promise<ChannelEntity> {
        return this.write({
            id: channel.id,
            guild_id: channel.guildId,
            name: channel.name,
            nsfw: channel.nsfw
        });
    }

    async updateByChannel(channel: TextChannel, content_id: number) {
        const messageContent = await this.MessageContentService.get(content_id);
        return await this.update(channel.id,{
            id: channel.id,
            guild_id: channel.guildId,
            name: channel.name,
            nsfw: channel.nsfw,
            last_content_id: content_id,
            last_content_date: messageContent!.date,
            last_content: messageContent!.content
        });
    }
}