import type { PoolClient } from "pg";
import { getUserIdByEmail } from "./getUserByEmail";


export async function getUserHashByEmail(db: PoolClient, email: string): Promise<string>{
    const userId = await getUserIdByEmail(db, email)
    const hash = await db.query(`SELECT hash FROM native_auth WHERE user_id=$1`, [userId])
    return hash.rows[0].hash
}