import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ChannelEntity } from './Channel';
import { GuildEntity } from './Guild';
import { MessageEntity } from './Message';
import { UserEntity } from './User';

@Entity('MessageContent')
export class MessageContentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => GuildEntity)
    @JoinColumn()
    guild: GuildEntity;

    @ManyToOne(() => ChannelEntity)
    @JoinColumn()
    channel: ChannelEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(() => MessageEntity)
    @JoinColumn()
    message: MessageEntity;

    @Column({ nullable: false, type: 'bigint' })
    created: number;

    @Column({ default: null, length: 4000 })
    content: string;
}
