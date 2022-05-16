import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('User')
export class UserEntity {
    @PrimaryColumn()
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    tag: string;

    @Column({ default: undefined })
    avatar: string;
}