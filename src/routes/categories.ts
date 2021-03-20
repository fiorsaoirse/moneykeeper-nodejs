/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Router from 'koa-router';
import { CategoryDAO } from '../DAO/index';
import { MoneyKeeperLogger } from '../utils/logger/logger';

const router: Router = new Router({
    prefix: '/categories',
});

const logger = new MoneyKeeperLogger('CATEGORIES');
const categoryDAO = new CategoryDAO(logger);

router.get('/:id', async (ctx) => {
    const { id } = ctx.params;
    const result = await categoryDAO.read(id);
    ctx.status = 200;
    ctx.body = result;
});

router.get('/', async (ctx) => {
    const result = await categoryDAO.readAll();
    ctx.status = 200;
    ctx.body = result;
});

router.post('/', async (ctx) => {
    const { body } = ctx.request;
    const result = await categoryDAO.create(body);
    ctx.status = 200;
    ctx.body = result;
});

router.put('/:id', async (ctx) => {
    const { id } = ctx.params;
    const { body } = ctx.request;
    const result = await categoryDAO.update(id, body);
    ctx.status = 200;
    ctx.body = result;
});

router.delete('/:id', async (ctx) => {
    try {
        const { id } = ctx.params;
        const result = await categoryDAO.delete(id);
        ctx.status = 200;
        ctx.body = result;
    } catch (err) {
        throw new Error(err);
    }
});

export default router;
