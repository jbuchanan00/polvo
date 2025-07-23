import type { PoolClient } from "pg";


export async function getUserById(db: PoolClient, id: string): Promise<FrontEndUser> {
    const res = await db.query(`SELECT * FROM app_user WHERE id = $1`, [id]).then((res) => {
        return res.rows[0]
    })
    return res
}