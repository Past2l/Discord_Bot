export interface IWriteAttachment {
    id: string;
    guild_id: string;
    channel_id: string;
    guild_name: string;
    channel_name: string;
    message_id: string;
    name: string;
    description?: string;
    type?: string;
    size: number;
    url: string;
    height?: number;
    width?: number;
    local_saved: boolean;
}