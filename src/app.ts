import Koa from 'koa';
import purchasesRoutes from './routes/purchases';
import Logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import errors from './middlewares/errors';

const app: Koa = new Koa();
const logger = Logger();

app.use(logger);
app.use(bodyParser());
app.use(errors);

app.use(purchasesRoutes.routes());
app.use(purchasesRoutes.allowedMethods());

export default app;