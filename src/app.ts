import Koa from 'koa';
import purchasesRoutes from './controllers/purchases';
import categoryRoutes from './controllers/categories';
import Logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import errors from './middlewares/errors';
import cors  from 'koa-cors';

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

// Set CORS configs
app.use(cors(corsOptions));

app.use(purchasesRoutes.routes());
app.use(purchasesRoutes.allowedMethods());

app.use(categoryRoutes.routes());
app.use(categoryRoutes.allowedMethods());

export default app;