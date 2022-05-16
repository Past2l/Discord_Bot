import { Event } from "../types/event";
import { Message, TextChannel } from "discord.js";
import { getCustomRepository } from "typeorm";
import { MessageService } from "../services/message";
import { MessageContentService } from "../services/messageContent";
import { ChannelService } from "../services/channel";
import { UserService } from "../services/user";
import { GuildService } from "../services/guild";

export default new Event('messageUpdate',async (oldMessage, newMessage) => {
    if(process.env.BOT_LOG==='true') {
        const messageService = getCustomRepository(MessageService);
        const messageContentService = getCustomRepository(MessageContentService);
        const channelService = getCustomRepository(ChannelService);
        const userService = getCustomRepository(UserService);
        const guildService = getCustomRepository(GuildService);
        const message = newMessage as Message;
        if(!message.author.bot && !message.author.system) {
            if(message.channel instanceof TextChannel && message) {
                if(!await userService.get(message.author.id)) await userService.writeByUser(message.author);
                if(!await guildService.get(message.guildId!)) await guildService.writeByGuild(message.guild!);
                if(!await channelService.get(message.channelId)) await channelService.writeByChannel(message.channel);
                const newContent = await messageContentService.writeByMessage(message);
                const body = await messageService.getByMessage(message);
                if(body) {
                    body.last_content_id = newContent.id;
                    body.last_content_date = message.editedTimestamp! | message.createdTimestamp;
                    body.last_content = newContent.content;
                    await messageService.updateByMessage(message, body);
                    await channelService.updateByChannel(message.channel, newContent.id);
                    await guildService.updateByGuild(message.guild!);
                }
            }
        }
    }
});