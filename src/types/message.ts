export interface IWriteMessage {
    id: string;
    guild_id: string;
    channel_id: string;
    guild_name: string;
    channel_name: string;
    user_id: string;
    last_content_id?: number;
    last_content_date: number;
    last_content?: string;
    deleted?: number;
    created: number;
    attachment: boolean;
}