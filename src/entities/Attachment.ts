import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ChannelEntity } from "./Channel";
import { GuildEntity } from "./Guild";
import { MessageEntity } from "./Message";
import { UserEntity } from "./User";

@Entity('Attachment')
export class AttachmentEntity {
    @PrimaryColumn({ nullable: false })
    id: string;

    @ManyToOne(()=>GuildEntity)
    @JoinColumn()
    guild: GuildEntity;

    @ManyToOne(()=>ChannelEntity)
    @JoinColumn()
    channel: ChannelEntity;

    @ManyToOne(()=>UserEntity)
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(()=>MessageEntity)
    @JoinColumn()
    message: MessageEntity;

    @Column({ nullable: false })
    name: string;

    @Column({ default: null })
    description: string;

    @Column({ default: null })
    type: string;

    @Column({ nullable: false })
    size: number;

    @Column({ nullable: false })
    url: string;

    @Column({ default: null })
    height: number;

    @Column({ default: null })
    width: number;

    @Column({ nullable: false })
    local_saved: boolean;
}