import { Message, MessageAttachment } from "discord.js";
import { ChannelEntity } from "../entities/Channel";
import { GuildEntity } from "../entities/Guild";
import { MessageEntity } from "../entities/Message";
import { UserEntity } from "../entities/User";

export interface Body {
    id: string;
    guild: GuildEntity;
    channel: ChannelEntity;
    user: UserEntity;
    message: MessageEntity;
    name: string;
    description?: string;
    type?: string;
    size: number;
    url: string;
    height?: number;
    width?: number;
    local_saved: boolean;
}

export interface Write {
    guild: GuildEntity;
    channel: ChannelEntity;
    user: UserEntity;
    message: MessageEntity;
    attachment: MessageAttachment;
    content: Message;
}