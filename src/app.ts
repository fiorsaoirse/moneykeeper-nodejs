import Koa from 'koa';
import Logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';
import purchasesRoutes from './routes/purchases';
import categoryRoutes from './routes/categories';
import errors from './middlewares/errors';

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

export default app;
