import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Message')
export class MessageEntity {
    @PrimaryGeneratedColumn()
    _id: number;

    @PrimaryColumn({ nullable: false })
    id: string;

    @Column({ nullable: false })
    guild_id: string;

    @Column({ nullable: false })
    channel_id: string;

    @Column({ nullable: false })
    user_id: string;

    @Column({ nullable: false })
    last_content: string;

    @Column({ nullable: false })
    created: number;

    @Column({ default: null })
    deleted: number;

    @Column({ nullable: false })
    attachment: boolean;
}