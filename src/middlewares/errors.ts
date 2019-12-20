import Koa from 'koa';

// tslint:disable-next-line: no-any
export default async (ctx: Koa.Context, next: () => Promise<any>): Promise<any> => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message
        };
    }
};