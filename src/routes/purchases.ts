/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Router from 'koa-router';
import { PurchaseDAO } from '../DAO/index';
import { MoneyKeeperLogger } from '../utils/logger/logger';

const router: Router = new Router({
    prefix: '/purchases',
});

const logger = new MoneyKeeperLogger('PURCHASES');
const purchaseDAO = new PurchaseDAO(logger);

router.get('/:id', async (ctx) => {
    try {
        const { id } = ctx.params;
        const result = await purchaseDAO.read(id);
        ctx.status = 200;
        ctx.body = result;
    } catch (err) {
        throw new Error(err);
    }
});

router.get('/', async (ctx) => {
    try {
        const result = await purchaseDAO.readAll();
        ctx.status = 200;
        ctx.body = result;
    } catch (err) {
        throw new Error(err);
    }
});

router.post('/', async (ctx) => {
    try {
        const { body } = ctx.request;
        const result = await purchaseDAO.create(body);
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
        const result = await purchaseDAO.update(id, body);
        ctx.status = 200;
        ctx.body = result;
    } catch (err) {
        throw new Error(err);
    }
});

router.delete('/:id', async (ctx) => {
    try {
        const { id } = ctx.params;
        const result = await purchaseDAO.delete(id);
        ctx.status = 200;
        ctx.body = result;
    } catch (err) {
        throw new Error(err);
    }
});

export default router;
