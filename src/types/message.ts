export interface IWriteMessage {
    id: string;
    guild_id: string;
    channel_id: string;
    user_id: string;
    last_content: number;
    deleted?: number;
    created: number;
    last_edited?: number;
    attachment: boolean;
}