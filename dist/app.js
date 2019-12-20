"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const purchases_1 = __importDefault(require("./routes/purchases"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const errors_1 = __importDefault(require("./middlewares/errors"));
const app = new koa_1.default();
const logger = koa_logger_1.default();
app.use(logger);
app.use(koa_bodyparser_1.default());
app.use(errors_1.default);
app.use(purchases_1.default.routes());
app.use(purchases_1.default.allowedMethods());
exports.default = app;
//# sourceMappingURL=app.js.map