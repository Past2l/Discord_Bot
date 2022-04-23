import { Event } from "../types/event";
import { TextChannel } from "discord.js";
import { getCustomRepository } from "typeorm";
import { MessageService } from "../services/message";

const messageService = getCustomRepository(MessageService);

export default new Event("messageCreate", async message => {
    if(!message.author.bot && !message.author.system) {
        if(message.channel as TextChannel) {
            await messageService.writeByMessage(message);
        }
    }
});