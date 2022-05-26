import { Message, TextChannel } from 'discord.js';
import { Event } from '../types/event';
import { getCustomRepository } from 'typeorm';
import { GuildEntity } from '../entities/Guild';
import { ChannelEntity } from '../entities/Channel';
import { UserEntity } from '../entities/User';
import { UserService } from '../services/user';
import { GuildService } from '../services/guild';
import { ChannelService } from '../services/channel';
import { MessageService } from '../services/message';

export default new Event('messageUpdate', async (oldMessage, newMessage) => {
    if (process.env.BOT_LOG == 'true') {
        const guildService = getCustomRepository(GuildService);
        const channelService = getCustomRepository(ChannelService);
        const userService = getCustomRepository(UserService);
        const messageService = getCustomRepository(MessageService);
        const message = newMessage as Message;
        if (
            !message.author.bot &&
            !message.author.system &&
            message.channel instanceof TextChannel
        ) {
            if (message.content.length <= 0 && message.attachments.size <= 0)
                return;
            const guild: GuildEntity =
                (await guildService.get(message.guildId!)) ||
                (await guildService.writeByGuild(message.guild!));
            const channel: ChannelEntity =
                (await channelService.get(message.channelId)) ||
                (await channelService.writeByChannel({
                    guild: guild,
                    channel: message.channel,
                }));
            const user: UserEntity =
                (await userService.get(message.author.id)) ||
                (await userService.writeByUser(message.author));
            const body = await messageService.getByMessage(message);
            if (body) {
                body.edited =
                    message.editedTimestamp || message.createdTimestamp;
                const res = await messageService.get(message.id);
                await messageService.updateByMessage(
                    {
                        guild: guild,
                        channel: channel,
                        user: user,
                        message: res!,
                        content: message,
                    },
                    body
                );
                await guildService.updateByGuild(message.guild!);
                await channelService.updateByChannel({
                    guild: guild,
                    channel: message.channel,
                });
                await userService.updateByUser(message.author);
            }
        }
    }
});
