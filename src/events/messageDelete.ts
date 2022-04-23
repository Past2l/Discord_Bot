import { Message, TextChannel } from "discord.js";
import { getCustomRepository } from "typeorm";
import { MessageService } from "../services/message";
import { Event } from "../types/event";

const messageService = getCustomRepository(MessageService);

export default new Event('messageDelete', async message =>{
    message = message as Message;
    if(!message.author.bot && !message.author.system) {
        if(message.channel as TextChannel && message) {
            const body = await messageService.getByMessage(message);
            body.deleted = +new Date();
            await messageService.updateByMessage(message, body);
        }
    }
})