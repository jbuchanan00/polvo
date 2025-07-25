import type { PoolClient } from "pg";
import { getUserIdByEmail } from "./getUser/getUserByEmail";

export async function getSaltByUser(db: PoolClient, email: string): Promise<string> {
    const userId = await getUserIdByEmail(db, email)
    const salt = (await db.query(`SELECT salt FROM native_auth WHERE user_id=$1`, [userId])).rows[0].salt
    return salt;
}