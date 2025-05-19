import type { PoolClient } from "pg";


export async function getUserIdByEmail(db: PoolClient, email: string): Promise<string>{
    return (await db.query(`SELECT id FROM account WHERE email=$1`, [email])).rows[0].id
}