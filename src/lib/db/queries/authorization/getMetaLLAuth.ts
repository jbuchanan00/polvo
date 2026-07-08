import type { PoolClient } from "pg";

export async function getMetaLLAuth(db: PoolClient, userId: string) {
    const query = "SELECT * FROM meta_lltokens where user_id=$1"
    const res = await db.query(query, [userId])
    return res.rows[0]
}