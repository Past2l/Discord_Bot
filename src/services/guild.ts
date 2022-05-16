import { Guild } from "discord.js";
import G from "glob";
import { DeleteResult, EntityRepository, getRepository } from "typeorm";
import { GuildEntity } from "../entities/Guild";
import { IWriteGuild } from "../types/guild";

@EntityRepository(GuildEntity)
export class GuildService {
    readonly GuildRepository = getRepository(GuildEntity);

    async get(id: string): Promise<GuildEntity | null> {
        const guild = this.GuildRepository.findOneBy({id:id});
        return guild;
    }

    async write(body: IWriteGuild): Promise<GuildEntity> {
        const newGuild = this.GuildRepository.create({
            ...body,
        });
        return await this.GuildRepository.save(newGuild);
    }

    async update(id: string, body: IWriteGuild) {
        return await this.GuildRepository.update(
            {
                id: id,
            },
            {
                ...body,
            }
        );
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.GuildRepository.delete({
            id: id,
        });
    }

    async writeByGuild(guild: Guild): Promise<GuildEntity> {
        return this.write({
            id: guild.id,
            name: guild.name,
            owner_id: guild.ownerId,
            icon: guild.iconURL() ? guild.iconURL()! : undefined,
            member: guild.members.cache.filter(user => !user.user.bot).size
        });
    }

    async updateByGuild(guild: Guild) {
        return this.update(guild.id,{
            id: guild.id,
            name: guild.name,
            owner_id: guild.ownerId,
            icon: guild.iconURL() ? guild.iconURL()! : undefined,
            member: guild.members.cache.filter(user => !user.user.bot).size
        });
    }
}