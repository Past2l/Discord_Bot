export interface IWriteChannel {
    id: string;
    guild_id: string;
    name: string;
    nsfw: string;
    last_content_id?: number;
    last_content: string;
}