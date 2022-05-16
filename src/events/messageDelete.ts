import { Message, TextChannel } from "discord.js";
import { getCustomRepository } from "typeorm";
import { ChannelService } from "../services/channel";
import { GuildService } from "../services/guild";
import { MessageService } from "../services/message";
import { UserService } from "../services/user";
import { Event } from "../types/event";

export default new Event('messageDelete', async message =>{
    if(process.env.BOT_LOG==='true') {
        const messageService = getCustomRepository(MessageService);
        const channelService = getCustomRepository(ChannelService);
        const userService = getCustomRepository(UserService);
        const guildService = getCustomRepository(GuildService);
        message = message as Message;
        if(!message.author.bot && !message.author.system) {
            if(message.channel instanceof TextChannel && message) {
                console.log(message.createdTimestamp,message.editedTimestamp);
                if(!await userService.get(message.author.id)) await userService.writeByUser(message.author);
                if(!await guildService.get(message.guildId!)) await guildService.writeByGuild(message.guild!);
                if(!await channelService.get(message.channelId)) await channelService.writeByChannel(message.channel);
                const body = await messageService.getByMessage(message);
                if(body) {
                    body.deleted = +new Date();
                    await messageService.updateByMessage(message, body);
                    await guildService.updateByGuild(message.guild!);
                }
            }
        }
    }
});