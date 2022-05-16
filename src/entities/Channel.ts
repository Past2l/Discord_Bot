import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Channel')
export class ChannelEntity {
    @PrimaryColumn()
    id: string;

    @Column({ nullable: false })
    guild_id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    nsfw: boolean;

    @Column({ default: undefined })
    last_content_id: number;

    @Column({ default: undefined, type: 'bigint' })
    last_content_date: number;
    
    @Column({ default: undefined })
    last_content: string;
}