import { Message } from "discord.js";
import { DeleteResult, EntityRepository, getCustomRepository, getRepository } from "typeorm";
import { LogEntity } from "../entities/Log";
import { IWriteLog } from "../types/log";
import { AttachmentService } from "./attachment";

@EntityRepository(LogEntity)
export class LogService {
    readonly LogRepository = getRepository(LogEntity);
    readonly AttachmentService = getCustomRepository(AttachmentService);

    async get(id: number): Promise<LogEntity | undefined> {
        const log = await this.LogRepository.findOneBy({_id:id});
        return log;
    }

    async write(body: IWriteLog): Promise<LogEntity> {
        const newLog = this.LogRepository.create({
            ...body,
        });
        return await this.LogRepository.save(newLog);
    }

    async update(id: number, body: IWriteLog) {
        return await this.LogRepository.update(
            {
                _id: id,
            },
            {
                ...body,
            }
        );
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.LogRepository.delete({
            _id: id,
        });
    }

    async getByMessage(message: Message): Promise<LogEntity | undefined> {
        const log = await this.LogRepository.findOneBy({id:message.id});
        return log;
    }

    async writeByMessage(message: Message): Promise<LogEntity> {
        const attachment = message.attachments.first();
        let isAttachment: boolean;
        if(attachment) {
            isAttachment = true;
            message.attachments.forEach(async v => await this.AttachmentService.writeByAttachment(v,message.id));
        } else isAttachment = false;
        return await this.write({
            id: message.id,
            guild_id: message.guildId,
            channel_id: message.channelId,
            user_id: message.author.id,
            content: message.content,
            created: message.createdAt,
            attachment: isAttachment,
            deleted: false
        });
    }

    async updateByMessageID(id: string, body: IWriteLog) {
        return await this.LogRepository.update(
            {
                id: id,
            },
            {
                ...body,
            }
        );
    }

    async deleteByMessageID(id: string): Promise<DeleteResult> {
        return await this.LogRepository.delete({
            id: id,
        });
    }
}