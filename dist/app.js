"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const routes_1 = __importDefault(require("./routes/routes"));
const koa_logger_1 = __importDefault(require("koa-logger"));
// import { Pool } from 'pg';
const app = new koa_1.default();
const logger = koa_logger_1.default();
// const pool: Pool = new Pool({
//     user: 'moneykeeper',
//     host: 'localhost',
//     database: 'moneykeeper',
//     password: 'Furseal22!',
//     port: 5432,
// });
app.use(logger);
app.use(routes_1.default.routes());
// app.pool = pool;
exports.default = app;
//# sourceMappingURL=app.js.map