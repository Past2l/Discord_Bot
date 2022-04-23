import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Guild')
export class GuildEntity {
    @PrimaryColumn()
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    owner_id: string;

    @Column({ nullable: false })
    icon: string;

    @Column({ nullable: false })
    membet: number;
}