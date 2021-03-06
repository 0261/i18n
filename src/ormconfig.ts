import { ConnectionOptions } from 'typeorm';

export const ormOption: ConnectionOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_PRODUCTION,
    entities: [`${__dirname}/entities/**/*.entity.ts`],
    synchronize: true,
    logging: true,
};
