import { DeleteResult, EntityRepository, getRepository } from 'typeorm';
import { AttachmentEntity } from '../entities/Attachment';
import * as AttachmentType from '../types/attachment';

@EntityRepository(AttachmentEntity)
export class AttachmentService {
    readonly AttachmentRepository = getRepository(AttachmentEntity);

    async get(id: string): Promise<AttachmentEntity | null> {
        const attachment = await this.AttachmentRepository.findOneBy({
            id: id,
        });
        return attachment;
    }

    async write(body: AttachmentType.Body): Promise<AttachmentEntity> {
        const newAttachment = this.AttachmentRepository.create({
            ...body,
        });
        return await this.AttachmentRepository.save(newAttachment);
    }

    async update(id: string, body: Partial<AttachmentType.Body>) {
        return await this.AttachmentRepository.update(
            {
                id: id,
            },
            {
                ...body,
            }
        );
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.AttachmentRepository.delete({
            id: id,
        });
    }

    async writeByAttachment(
        data: AttachmentType.Write
    ): Promise<AttachmentEntity> {
        return this.write({
            id: data.attachment.id,
            guild: data.guild,
            channel: data.channel,
            user: data.user,
            message: data.message,
            name: data.attachment.name!,
            description: data.attachment.description || undefined,
            type: data.attachment.contentType || undefined,
            size: data.attachment.size,
            url: data.attachment.url,
            height: data.attachment.height || undefined,
            width: data.attachment.width || undefined,
            local_saved: false,
        });
    }
}
