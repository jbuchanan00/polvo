import type { PoolClient } from "pg";
import { getUserIdByEmail } from "./getUserByEmail";


export async function getUserHashByEmail(db: PoolClient, email: string): Promise<string>{
    const userId = await getUserIdByEmail(db, email)
    const hash = await db.query(`SELECT hash FROM authentication WHERE userId=$1`, [BigInt(userId)])
    return hash.rows[0].hash
}