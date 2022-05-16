import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('Attachment')
export class AttachmentEntity {
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
    message_id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ default: undefined })
    description: string;

    @Column({ default: undefined })
    type: string;

    @Column({ nullable: false })
    size: number;

    @Column({ nullable: false })
    url: string;

    @Column({ default: undefined })
    height: number;

    @Column({ default: undefined })
    width: number;

    @Column({ nullable: false })
    local_saved: boolean;
}