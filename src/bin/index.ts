/* eslint-disable no-console */
import Koa from 'koa';
import initializeApp from '../app';
import config from '../environment/config';

const port = config.port || 3000;

initializeApp(config)
    .then((app: Koa) => app.listen(port, () => console.log(`Server running on port ${port}`)))
    .catch((error) => console.error(error));
