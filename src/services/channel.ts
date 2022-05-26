import { DeleteResult, EntityRepository, getRepository } from 'typeorm';
import { ChannelEntity } from '../entities/Channel';
import * as ChannelType from '../types/channel';

@EntityRepository(ChannelEntity)
export class ChannelService {
    readonly ChannelRepository = getRepository(ChannelEntity);

    async get(id: string): Promise<ChannelEntity | null> {
        const channel = this.ChannelRepository.findOneBy({ id: id });
        return channel;
    }

    async write(body: ChannelType.Body): Promise<ChannelEntity> {
        const newChannel = this.ChannelRepository.create({
            ...body,
        });
        return await this.ChannelRepository.save(newChannel);
    }

    async update(id: string, body: Partial<ChannelType.Body>) {
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

    async writeByChannel({
        guild,
        channel,
    }: ChannelType.Write): Promise<ChannelEntity> {
        return this.write({
            id: channel.id,
            guild: guild,
            name: channel.name,
            nsfw: channel.nsfw,
        });
    }

    async updateByChannel({ guild, channel }: ChannelType.Write) {
        return await this.update(channel.id, {
            id: channel.id,
            guild: guild,
            name: channel.name,
            nsfw: channel.nsfw,
        });
    }
}
