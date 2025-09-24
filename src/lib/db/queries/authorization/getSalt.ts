import type { PoolClient } from "pg";
import { getUserByEmail } from "..";

export async function getSaltByUser(db: PoolClient, email: string): Promise<string> {
    const userId = await getUserByEmail(db, email).then((res) => {
        return res.id
    })
    const salt = (await db.query(`SELECT salt FROM native_auth WHERE user_id=$1`, [userId])).rows[0].salt
    return salt;
}