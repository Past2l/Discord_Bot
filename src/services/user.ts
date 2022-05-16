import { User } from "discord.js";
import { DeleteResult, EntityRepository, getRepository } from "typeorm";
import { UserEntity } from "../entities/User";
import { IWriteUser } from "../types/user";

@EntityRepository(UserEntity)
export class UserService {
    readonly UserRepository = getRepository(UserEntity);
    
    async get(id: string): Promise<UserEntity | null> {
        const user = this.UserRepository.findOneBy({id:id});
        return user;
    }

    async write(body: IWriteUser): Promise<UserEntity> {
        const newUser = this.UserRepository.create({
            ...body,
        });
        return await this.UserRepository.save(newUser);
    }

    async update(id: string, body: IWriteUser) {
        return await this.UserRepository.update(
            {
                id: id,
            },
            {
                ...body,
            }
        );
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.UserRepository.delete({
            id: id,
        });
    }

    async writeByUser(user: User): Promise<UserEntity> {
        return this.write({
            id: user.id,
            name: user.username,
            tag: user.tag.split('#')[1],
            avatar: user.avatarURL() ? user.avatarURL()! : undefined
        });
    }

    async updateByUser(user: User) {
        return this.update(user.id,{
            id: user.id,
            name: user.username,
            tag: user.tag.split('#')[1],
            avatar: user.avatarURL() ? user.avatarURL()! : undefined
        });
    }
}