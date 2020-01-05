import { categoryDAO } from '../DAO/index';
import Router = require('koa-router');

const router: Router = new Router({
    prefix: '/categories'
});

router.get('/:id', async (ctx) => {
    try {
        const { id } = ctx.params;
        const result = await categoryDAO.readCategory(id);
        ctx.status = 200;
        ctx.body = result;
    } catch (err) {
        throw new Error(err);
    }
});

router.get('/', async (ctx) => {
    try {
        const result = await categoryDAO.readCategories();
        ctx.status = 200;
        ctx.body = result;
    } catch (err) {
        throw new Error(err);
    }
});

router.post('/', async (ctx) => {
    try {
        const { body } = ctx.request;
        const result = await categoryDAO.createCategory(body);
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
        const result = await categoryDAO.updateCategory(id, body);
        ctx.status = 200;
        ctx.body = result;
    } catch (err) {
        throw new Error(err);
    }
});

router.delete('/:id', async (ctx) => {
    try {
        const { id } = ctx.params;
        const result = await categoryDAO.deleteCategory(id);
        ctx.status = 200;
        ctx.body = result;
    } catch (err) {
        throw new Error(err);
    }
});

export default router;