import { ColorResolvable, EmbedFooterData, MessageEmbed } from 'discord.js';

interface Embed {
    title: string;
    color: string;
    url?: string;
    image?: string;
    thumbnail?: string;
    footer?: EmbedFooterData;
    timestamp?: boolean;
}

interface Default extends Embed {
    desc?: string;
}

interface Field extends Embed {
    field: Array<{
        name: string;
        value: string;
        inline?: boolean;
    }>;
}

export function EmbedDefault({
    title,
    desc,
    color,
    url,
    image,
    thumbnail,
    footer,
    timestamp,
}: Default): MessageEmbed {
    let embed = new MessageEmbed()
        .setColor(color as ColorResolvable)
        .setTitle(title);
    if (url) embed.setURL(url);
    if (image) embed.setImage(image);
    if (thumbnail) embed.setThumbnail(thumbnail);
    if (desc) embed.setDescription(desc);
    if (footer) embed.setFooter(footer);
    if (timestamp) embed.setTimestamp();
    return embed;
}

export function EmbedField({
    title,
    field,
    color,
    url,
    image,
    thumbnail,
    footer,
    timestamp,
}: Field): MessageEmbed {
    let embed = new MessageEmbed()
        .setColor(color as ColorResolvable)
        .setTitle(title)
        .addFields(field);
    if (url) embed.setURL(url);
    if (image) embed.setImage(image);
    if (thumbnail) embed.setThumbnail(thumbnail);
    if (footer) embed.setFooter(footer);
    if (timestamp) embed.setTimestamp();
    return embed;
}

export function EmbedError(content: string) {
    return {
        embeds: [
            EmbedDefault({
                color: '#ff0000',
                title: '오류가 발생하였습니다.',
                desc: `\`\`\`${content}\`\`\``,
                timestamp: true,
            }),
        ],
        ephemeral: true,
    };
}
