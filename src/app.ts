import Koa from 'koa';
import purchasesRoutes from './routes/purchases';
import categoryRoutes from './routes/categories';
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

app.use(categoryRoutes.routes());
app.use(categoryRoutes.allowedMethods());

export default app;