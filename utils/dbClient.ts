import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function executeQuery(sql: string, params?: any[]) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    const [result] = await connection.execute(sql, params);
    await connection.end();
    return result;
}