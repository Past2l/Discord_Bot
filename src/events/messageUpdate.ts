import { Event } from "../types/event";
import { Message, TextChannel } from "discord.js";
import { getCustomRepository } from "typeorm";
import { MessageService } from "../services/message";
import { MessageContentService } from "../services/messageContent";

const messageService = getCustomRepository(MessageService);
const messageContentService = getCustomRepository(MessageContentService)

export default new Event('messageUpdate',async (oldMessage, newMessage) => {
    const message = newMessage as Message;
    if(!message.author.bot) {
        if(message.channel as TextChannel && message) {
            const newContent = await messageContentService.writeByMessage(message);
            const body = await messageService.getByMessage(message);
            body.last_edited = message.editedTimestamp;
            body.last_content = newContent._id;
            messageService.updateByMessage(message,body);
        }
    }
});