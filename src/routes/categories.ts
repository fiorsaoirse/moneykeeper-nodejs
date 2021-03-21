/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Router from 'koa-router';
import { CategoryController } from '../controllers/index';
import { MoneyKeeperLogger } from '../utils/logger/logger';

const router: Router = new Router({
    prefix: '/categories',
});

const logger = new MoneyKeeperLogger('CATEGORIES');
const categoryController = new CategoryController(logger);

router.get('/:id', async (ctx) => {
    const { id } = ctx.params;
    const result = await categoryController.read(id);
    ctx.status = 200;
    ctx.body = result;
});

router.get('/', async (ctx) => {
    const result = await categoryController.readAll();
    ctx.status = 200;
    ctx.body = result;
});

router.post('/', async (ctx) => {
    const { body } = ctx.request;
    const result = await categoryController.create(body);
    ctx.status = 200;
    ctx.body = result;
});

router.put('/:id', async (ctx) => {
    const { id } = ctx.params;
    const { body } = ctx.request;
    const result = await categoryController.update(id, body);
    ctx.status = 200;
    ctx.body = result;
});

router.delete('/:id', async (ctx) => {
    try {
        const { id } = ctx.params;
        const result = await categoryController.delete(id);
        ctx.status = 200;
        ctx.body = result;
    } catch (err) {
        throw new Error(err);
    }
});

export default router;
