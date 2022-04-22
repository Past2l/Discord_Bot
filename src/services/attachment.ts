import { Message, MessageAttachment, TextChannel } from "discord.js";
import { DeleteResult, EntityRepository, getRepository } from "typeorm";
import { AttachmentEntity } from "../entities/Attachment";
import { IWriteAttachment } from "../types/attachment";

@EntityRepository(AttachmentEntity)
export class AttachmentService {
    readonly AttachmentRepository = getRepository(AttachmentEntity);

    async get(id: number): Promise<AttachmentEntity | undefined> {
        const attachment = await this.AttachmentRepository.findOneBy({_id:id});
        return attachment;
    }

    async write(body: IWriteAttachment): Promise<AttachmentEntity> {
        const newAttachment = this.AttachmentRepository.create({
            ...body,
        });
        return await this.AttachmentRepository.save(newAttachment);
    }

    async update(id: number, body: IWriteAttachment) {
        return await this.AttachmentRepository.update(
            {
                _id: id,
            },
            {
                ...body,
            }
        );
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.AttachmentRepository.delete({
            _id: id,
        });
    }

    async writeByAttachment(attachment: MessageAttachment,message: Message): Promise<AttachmentEntity> {
        const channel = message.channel as TextChannel;
        return this.write({
            id: attachment.id,
            guild_name: message.guild.name,
            channel_name: channel.name,
            guild_id: message.guildId,
            channel_id: message.channelId,
            message_id: message.id,
            name: attachment.name,
            description: attachment.description,
            type: attachment.contentType,
            size: attachment.size,
            url: attachment.url,
            height: attachment.height,
            width: attachment.width,
            local_saved: false
        });
    }
}