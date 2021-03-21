/* eslint-disable no-console */
import Koa from 'koa';
import Logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';
import { Connection } from 'typeorm';
import { IConfig } from 'models/contracts/iConfig';
import errors from './middlewares/errors';
import postgresDB from './databases/postgres-db';
import { purchasesRoutes, categoryRoutes } from './routes/index';

const initializeApp = (config: IConfig): Promise<Koa> => {
    return postgresDB(config).then((connection: Connection) => {
        console.log(`Connection: ${connection.isConnected ? 'connected' : 'failed'}`);
        console.log('Start initializating application');
        const app: Koa = new Koa();
        const logger = Logger();

        const corsOptions = {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            headers: 'X-Requested-With,content-type,',
        };

        app.use(logger);
        app.use(bodyParser());
        app.use(errors);

        app.use(cors(corsOptions));

        app.use(purchasesRoutes.routes());
        app.use(purchasesRoutes.allowedMethods());

        app.use(categoryRoutes.routes());
        app.use(categoryRoutes.allowedMethods());

        return app;
    });
};

export default initializeApp;
