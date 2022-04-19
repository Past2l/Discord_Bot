import { createConnection } from 'typeorm';
import { AttachmentEntity } from '../entities/Attachment';
import { LogEntity } from '../entities/Log';

export default async () => {
    await createConnection({
        type: 'mariadb',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || ''),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        logging: false,
        entities: [
            LogEntity,
            AttachmentEntity,
        ],
        migrations: [],
        subscribers: [],
    })
    .then(_=>console.log('Database Connected'))
    .catch(error=>console.error(error));
};