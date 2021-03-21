/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Koa from 'koa';

const HTTP_SERVER_ERROR_CODE = 500;

export default async (ctx: Koa.Context, next: () => Promise<unknown>): Promise<void> => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.statusCode || err.status || HTTP_SERVER_ERROR_CODE;
        ctx.body = {
            message: err.message,
        };
    }
};
