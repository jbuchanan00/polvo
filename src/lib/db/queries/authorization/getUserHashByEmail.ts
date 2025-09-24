import type { PoolClient } from "pg";
import { getUserByEmail } from "..";


export async function getUserHashByEmail(db: PoolClient, email: string): Promise<string>{
    const userId = await getUserByEmail(db, email).then((res: User) => {
        return res.id
    })
    const hash = await db.query(`SELECT hash FROM native_auth WHERE user_id=$1`, [userId])
    return hash.rows[0].hash
}