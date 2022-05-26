import { Message } from 'discord.js';
import { ChannelEntity } from '../entities/Channel';
import { GuildEntity } from '../entities/Guild';
import { MessageEntity } from '../entities/Message';
import { UserEntity } from '../entities/User';

export interface Body {
    id: string;
    guild: GuildEntity;
    channel: ChannelEntity;
    user: UserEntity;
    edited?: number;
    deleted?: number;
    created: number;
    attachment: boolean;
}

export interface Write {
    guild: GuildEntity;
    channel: ChannelEntity;
    user: UserEntity;
    message: Message;
}

export interface Update {
    guild: GuildEntity;
    channel: ChannelEntity;
    user: UserEntity;
    message: MessageEntity;
    content: Message;
}
