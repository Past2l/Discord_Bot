import { createConnection } from 'typeorm';
import { MessageEntity } from '../entities/Message';
import { MessageContentEntity } from '../entities/MessageContent';
import { AttachmentEntity } from '../entities/Attachment';
import { UserEntity } from '../entities/User';
import { ChannelEntity } from '../entities/Channel';
import { GuildEntity } from '../entities/Guild';

export default async () => {
    await createConnection({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || ''),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        logging: false,
        entities: [
            MessageEntity,
            MessageContentEntity,
            AttachmentEntity,
            UserEntity,
            ChannelEntity,
            GuildEntity,
        ],
        migrations: [],
        subscribers: [],
        charset : 'utf8mb4'
    })
    .then(_=>console.log('Database Connected'))
    .catch(error=>console.error(error));
};