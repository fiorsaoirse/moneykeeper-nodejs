/*
This file initializes PostgreSQL database.
*/

import { Connection, createConnection } from 'typeorm';
import { postgresTables } from './postrgestables';

export const postgresDB = async () => {
    return await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'moneykeeper',
        password: 'moneykeeper',
        database: 'moneykeeper',
        schema: 'moneykeeper',
        ssl: false,
        logging: ['query', 'error'],
        synchronize: true,
        entities: postgresTables,
    }).then((connection: Connection) => {
        console.log(`Database connection is connected: ${connection.isConnected}`);
    }).catch((err) => {
        console.error(`Error during initialiaztion database connection: ${err}`);
    });
};