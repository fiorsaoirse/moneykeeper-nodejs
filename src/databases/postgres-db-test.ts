/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-console */
import { createConnection } from 'typeorm';
import postgresTables from './postrgestables';
import config from '../environment/config-test';

export const postgresDB = async (): Promise<void> => {
    try {
        await createConnection({
            type: 'postgres',
            host: config.host,
            port: config.port,
            username: config.username,
            password: config.password,
            database: config.database,
            schema: config.schema,
            ssl: false,
            logging: ['query', 'error'],
            synchronize: true,
            entities: postgresTables,
        });
        console.log('Database connection is connected');
    } catch (error) {
        console.error(`Error during initialiaztion database connection: ${error.message}`);
    }
};
