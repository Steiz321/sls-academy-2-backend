import { Pool } from 'pg';

const pool = new Pool({
    database: '01_AUTH',
    user: 'postgres',
    password: '12345',
    host: 'localhost',
    port: 5432
})

export default pool;
