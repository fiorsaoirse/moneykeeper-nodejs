/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Router from 'koa-router';
import { PurchaseController } from '../controllers/index';
import { MoneyKeeperLogger } from '../utils/logger/logger';

const router: Router = new Router({
    prefix: '/purchases',
});

const logger = new MoneyKeeperLogger('PURCHASES');
const purchaseController = new PurchaseController(logger);

router.get('/:id', async (ctx) => {
    try {
        const { id } = ctx.params;
        const result = await purchaseController.read(id);
        ctx.status = 200;
        ctx.body = result;
    } catch (err) {
        throw new Error(err);
    }
});

router.get('/', async (ctx) => {
    try {
        const result = await purchaseController.readAll();
        ctx.status = 200;
        ctx.body = result;
    } catch (err) {
        throw new Error(err);
    }
});

router.post('/', async (ctx) => {
    try {
        const { body } = ctx.request;
        const result = await purchaseController.create(body);
        ctx.status = 200;
        ctx.body = result;
    } catch (err) {
        throw new Error(err);
    }
});

router.patch('/:id', async (ctx) => {
    try {
        const { id } = ctx.params;
        const { body } = ctx.request;
        const result = await purchaseController.update(id, body);
        ctx.status = 200;
        ctx.body = result;
    } catch (err) {
        throw new Error(err);
    }
});

router.delete('/:id', async (ctx) => {
    try {
        const { id } = ctx.params;
        const result = await purchaseController.delete(id);
        ctx.status = 200;
        ctx.body = result;
    } catch (err) {
        throw new Error(err);
    }
});

export default router;
