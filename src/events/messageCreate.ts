import { Event } from "../types/event";
import { TextChannel } from "discord.js";
import { getCustomRepository } from "typeorm";
import { MessageService } from "../services/message";
import { MessageContentService } from "../services/messageContent";
import { ChannelService } from "../services/channel";
import { UserService } from "../services/user";
import { GuildService } from "../services/guild";

const messageService = getCustomRepository(MessageService);
const messageContentService = getCustomRepository(MessageContentService);
const userService = getCustomRepository(UserService);
const channelService = getCustomRepository(ChannelService);
const guildService = getCustomRepository(GuildService);

export default new Event("messageCreate", async message => {
    if(await userService.get(message.author.id) == null) await userService.writeByUser(message.author);
    if(await guildService.get(message.guildId) == null) await guildService.writeByGuild(message.guild);
    if(!message.author.bot && !message.author.system) {
        if(message.channel instanceof TextChannel) {
            if(await channelService.get(message.channelId) == null) await channelService.writeByChannel(message.channel);
            let messageContent = await messageContentService.writeByMessage(message);
            await channelService.updateByChannel(message.channel,messageContent.id);
            await messageService.writeByMessage(message,messageContent.id);
            await guildService.updateByGuild(message.guild);
        }
    }
});