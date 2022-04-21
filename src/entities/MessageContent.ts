import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('MessageContent')
export class MessageContentEntity {
    @PrimaryGeneratedColumn()
    _id: number;

    @Column({ nullable: false })
    id: string;

    @Column({ nullable: false })
    guild_id: string;

    @Column({ nullable: false })
    channel_id: string;

    @Column({ nullable: false })
    content: string;

    @Column({ nullable: false })
    date: number;
}