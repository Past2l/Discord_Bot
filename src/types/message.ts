export interface IWriteMessage {
    id: string;
    guild_id: string;
    channel_id: string;
    user_id: string;
    last_content: string;
    deleted?: number;
    created: number;
    attachment: boolean;
}