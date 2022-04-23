export interface IWriteChannel {
    id: string;
    guild_id: string;
    name: string;
    nsfw: boolean;
    last_content_id?: number;
    last_content_date?: number;
    last_content?: string;
}