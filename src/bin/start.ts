#!/usr/bin/nodejs
import app from '../app';
import config from '../environment/config';
import { postgresDB } from '../databases/postgres-db';

const port = config.port || 3000;

const start = (): void => {
    postgresDB()
        .then(() => {
            // eslint-disable-next-line no-console
            app.listen(port, () => console.log(`Server running on port ${port}`));
        })
        // eslint-disable-next-line no-console
        .catch((e) => console.error(e));
};

start();
