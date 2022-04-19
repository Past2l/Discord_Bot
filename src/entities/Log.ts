import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('log')
export class LogEntity {
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
    content: string;

    @Column({ nullable: false })
    created: Date;

    @Column({ nullable: false })
    deleted: boolean;

    @Column({ nullable: false})
    attachment: boolean;
}