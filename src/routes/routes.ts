import Router from 'koa-router';

const router: Router = new Router();

router.get('/', async (ctx) => {
    ctx.body = {
        status: 'success',
        message: 'Hello World!',
    };
});


export default router;