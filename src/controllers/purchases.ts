import { purchaseDAO } from '../DAO/index';
import Router = require('koa-router');

const router: Router = new Router({
    prefix: '/purchases'
});

router.get('/:id', async (ctx) => {
    try {
        const { id } = ctx.params;
        const result = await purchaseDAO.readPurchase(id);
        ctx.status = 200;
        ctx.body = result;
    } catch (err) {
        throw new Error(err);
    }
});

router.get('/', async (ctx) => {
    try {
        const result = await purchaseDAO.readPurchases();
        ctx.status = 200;
        ctx.body = result;
    } catch (err) {
        throw new Error(err);
    }
});

router.post('/', async (ctx) => {
    try {
        const { body } = ctx.request;
        const result = await purchaseDAO.createPurchase(body);
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
        const result = await purchaseDAO.updatePurchase(id, body);
        ctx.status = 200;
        ctx.body = result;
    } catch (err) {
        throw new Error(err);
    }
});

router.delete('/:id', async (ctx) => {
    try {
        const { id } = ctx.params;
        console.log(id);
        const result = await purchaseDAO.deletePurchase(id);
        ctx.status = 200;
        ctx.body = result;
    } catch (err) {
        throw new Error(err);
    }
});

export default router;