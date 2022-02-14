const mysql2 = require('mysql2/promise'); // - ❗ wersja promisowa;
import 'dotenv/config';

export const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    decimalNumbers: true,   // - decimal is not a string anymore;
    namedPlaceholders: true, // - use placeholders;
});