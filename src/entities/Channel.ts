import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { GuildEntity } from "./Guild";

@Entity('Channel')
export class ChannelEntity {
    @PrimaryColumn()
    id: string;

    @ManyToOne(()=>GuildEntity)
    @JoinColumn()
    guild: GuildEntity;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    nsfw: boolean;
}