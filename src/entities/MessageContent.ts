import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('MessageContent')
export class MessageContentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    message_id: string;

    @Column({ nullable: false })
    guild_id: string;

    @Column({ nullable: false })
    channel_id: string;

    @Column({ nullable: false })
    guild_name: string;

    @Column({ nullable: false })
    channel_name: string;

    @Column({ default: null, length: 4000 })
    content: string;

    @Column({ nullable: false, type:'bigint' })
    date: number;
}