export interface IWriteLog {
    id: string;
    guild_id: string;
    channel_id: string;
    user_id: string;
    content: string;
    created: Date;
    attachment: boolean;
}