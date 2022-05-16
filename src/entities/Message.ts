import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Message')
export class MessageEntity {
    @PrimaryColumn({ nullable: false })
    id: string;

    @Column({ nullable: false })
    guild_id: string;

    @Column({ nullable: false })
    channel_id: string;

    @Column({ nullable: false })
    guild_name: string;

    @Column({ nullable: false })
    channel_name: string;

    @Column({ nullable: false })
    user_id: string;

    @Column({ nullable: false, type: 'bigint' })
    created: number;

    @Column({ default: null, type: 'bigint' })
    deleted: number;

    @Column({ nullable: false })
    last_content_id: number;

    @Column({ nullable: false, type: 'bigint' })
    last_content_date: number;

    @Column({ default: null, length: 4000 })
    last_content: string;

    @Column({ nullable: false })
    attachment: boolean;
}