/*
This file initializes PostgreSQL database.
*/

import { createConnection } from 'typeorm';
import { postgresTables } from '../databases/postrgestables';

export const postgresDB = async () => {
    return await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'moneykeeper',
        password: 'moneykeeper',
        database: 'moneykeeper',
        schema: 'moneykeeper',
        ssl: true,
        logging: ['query', 'error'],
        synchronize: true,
        entities: postgresTables,
    }).then(() => {
        console.log('Database connection established');
    });
};