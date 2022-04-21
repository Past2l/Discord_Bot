import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('Attachment')
export class AttachmentEntity {
    @PrimaryGeneratedColumn()
    _id: number;

    @PrimaryColumn({ nullable: false })
    id: string;

    @Column({ nullable: false })
    message_id: string;

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