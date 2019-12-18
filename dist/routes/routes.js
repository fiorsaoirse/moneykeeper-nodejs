"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const router = new koa_router_1.default();
router.get('/', async (ctx) => {
    ctx.body = {
        status: 'success',
        message: 'Hello World!',
    };
});
exports.default = router;
//# sourceMappingURL=routes.js.map