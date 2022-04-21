import { Event } from "../types/event";
import { Message, TextChannel } from "discord.js";
import { getCustomRepository } from "typeorm";
import { MessageService } from "../services/message";

const messageService = getCustomRepository(MessageService);

export default new Event('messageUpdate',async (oldMessage, newMessage) => {
    const message = newMessage as Message;
    if(!message.author.bot) {
        if(message.channel as TextChannel && message) {
            const body = await messageService.getByMessage(message);
            messageService.updateByMessage(message,body);
        }
    }
});