export interface IWriteMessageContent {
    message_id: string;
    guild_id: string;
    channel_id: string;
    guild_name: string;
    channel_name: string;
    content?: string;
    date: number;
}