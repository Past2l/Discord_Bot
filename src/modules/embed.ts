import { ColorResolvable, EmbedFooterData, MessageEmbed } from "discord.js";

interface Embed {
    title: string,
    color: string,
    url?: string,
    image?: string,
    thumbnail?: string,
    footer?: EmbedFooterData,
    timestamp?: boolean
}

interface Default extends Embed {
    desc?: string
}

interface Field extends Embed {
    field: Array<{
        name: string,
        desc: string,
        inline?: boolean,
    }>
}

export function Default({ title, desc, color, url, image, thumbnail, footer, timestamp }: Default): MessageEmbed {
    let embed = new MessageEmbed()
        .setColor(color as ColorResolvable)
        .setTitle(title)
        .setURL(url)
        .setImage(image)
        .setThumbnail(thumbnail);
    if(desc) embed.setDescription(desc)
    if(footer) embed.setFooter(footer)
    if(timestamp) embed.setTimestamp();
    return embed;
}

export function Field({ title, field, color, url, image, thumbnail, footer, timestamp }: Field): MessageEmbed {
    let embed = new MessageEmbed()
        .setColor(color as ColorResolvable)
        .setTitle(title)
        .setURL(url)
        .setImage(image)
        .setThumbnail(thumbnail);
    if(footer) embed.setFooter(footer)
    field.forEach(i=>embed.addField(i.name,i.desc,i.inline));
    if(timestamp) embed.setTimestamp();
    return embed;
}

export function Error(content: string) {
    return {
        embeds : [
            Default({
                color:'#ff0000',
                title:'오류가 발생하였습니다.',
                desc:`\`\`\`${content}\`\`\``,
                timestamp:true
            })
        ],
        ephemeral: true
    }
}