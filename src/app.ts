import Koa from 'koa';
import router from './routes/routes';
import Logger from 'koa-logger';
// import { Pool } from 'pg';

const app: Koa = new Koa();
const logger = Logger();
// const pool: Pool = new Pool({
//     user: 'moneykeeper',
//     host: 'localhost',
//     database: 'moneykeeper',
//     password: 'moneykeeper',
//     port: 5432,
// });

app.use(logger);
app.use(router.routes());

// app.pool = pool;

export default app;