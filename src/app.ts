import Koa from 'koa';
import router from './routes/routes';
import Logger from 'koa-logger';

const app: Koa = new Koa();
const logger = Logger();

app.use(logger);
app.use(router.routes());

export default app;