"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    database: '01_AUTH',
    user: 'postgres',
    password: '12345',
    host: 'localhost',
    port: 5432
});
exports.default = pool;
