import type { PoolClient } from "pg";


export async function setMetaInformation(db: PoolClient, payload: { userId: string, instagramId: string, instagram_username: string | null }) {
    const query = "INSERT INTO instagram_info (instagram_id, user_id, username) VALUES ($1, $2, $3);"

    const res = await db.query(query, [payload.instagramId, payload.userId, payload.instagram_username])

    return res.rows[0]
}