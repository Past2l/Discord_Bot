import { TextChannel } from "discord.js";
import { GuildEntity } from "../entities/Guild";

export interface Body {
    id: string;
    guild: GuildEntity;
    name: string;
    nsfw: boolean;
}

export interface Write {
    guild: GuildEntity;
    channel: TextChannel;
}