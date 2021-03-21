/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-console */
import { IConfig } from 'models/contracts/iConfig';
import { createConnection, Connection } from 'typeorm';
import postgresTables from './postrgestables';

export default async (config: IConfig): Promise<Connection> => {
    try {
        console.log('Start initializing DB');
        const connection = await createConnection({
            name: 'default',
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
        return connection;
    } catch (error) {
        return Promise.reject(new Error(`Error during initialiaztion database connection: ${error.message}`));
    }
};
