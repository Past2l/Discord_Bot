import { Event } from "../types/event";
import { TextChannel } from "discord.js";
import { getCustomRepository } from "typeorm";
import { MessageService } from "../services/message";
import { ChannelService } from "../services/channel";
import { UserService } from "../services/user";
import { GuildService } from "../services/guild";
import { GuildEntity } from "../entities/Guild";
import { ChannelEntity } from "../entities/Channel";
import { UserEntity } from "../entities/User";

export default new Event("messageCreate", async message => {
    if(process.env.BOT_LOG==='true') {
        const guildService = getCustomRepository(GuildService);
        const channelService = getCustomRepository(ChannelService);
        const userService = getCustomRepository(UserService);
        const messageService = getCustomRepository(MessageService);
        if(!message.author.bot && !message.author.system) {
            if(message.channel instanceof TextChannel) {
                const guild: GuildEntity = await guildService.get(message.guildId!) || await guildService.writeByGuild(message.guild!);
                const channel: ChannelEntity = await channelService.get(message.channelId) || await channelService.writeByChannel({
                    guild: guild,
                    channel: message.channel
                });
                const user: UserEntity = await userService.get(message.author.id) || await userService.writeByUser(message.author);
                await guildService.updateByGuild(message.guild!);
                await channelService.updateByChannel({
                    guild: guild,
                    channel: message.channel
                });
                await messageService.writeByMessage({
                    guild: guild,
                    channel: channel,
                    user: user,
                    message: message
                });
                await userService.updateByUser(message.author);
            }
        }
    }
});