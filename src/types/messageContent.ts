import { Message } from "discord.js";
import { ChannelEntity } from "../entities/Channel";
import { GuildEntity } from "../entities/Guild";
import { MessageEntity } from "../entities/Message";
import { UserEntity } from "../entities/User";

export interface Body {
    guild: GuildEntity;
    channel: ChannelEntity;
    user: UserEntity;
    message: MessageEntity;
    created: number;
    content?: string;
}

export interface Write {
    guild: GuildEntity;
    channel: ChannelEntity;
    user: UserEntity;
    message: MessageEntity;
    content: Message;
}