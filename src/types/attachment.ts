export interface IWriteAttachment {
    id: string;
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