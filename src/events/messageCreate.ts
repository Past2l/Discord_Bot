import { Event } from "../types/event";
import { TextChannel } from "discord.js";
import { getCustomRepository } from "typeorm";
import { LogService } from "../services/log";

const log = getCustomRepository(LogService);

export default new Event("messageCreate", async message => {
    if(!message.author.bot) {
        if(message.channel as TextChannel) {
            log.writeByMessage(message);
        }
    }
});