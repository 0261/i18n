import '../env';
import { createConnection } from 'typeorm';

export const testConnection = (drop: boolean = false) => {
    return createConnection({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_DEVELOPMENT,
        entities: [`${__dirname}/../entities/**/*.entity.ts`],
        synchronize: drop,
        dropSchema: drop,
        logging: false,
    });
};
