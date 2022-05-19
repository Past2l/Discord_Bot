import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ChannelEntity } from './Channel';
import { GuildEntity } from './Guild';
import { MessageContentEntity } from './MessageContent';
import { UserEntity } from './User';

@Entity('Message')
export class MessageEntity {
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

    @Column({ nullable: false, type: 'bigint' })
    created: number;

    @Column({ default: null, type: 'bigint' })
    edited: number;

    @Column({ default: null, type: 'bigint' })
    deleted: number;

    @Column({ nullable: false })
    attachment: boolean;
}