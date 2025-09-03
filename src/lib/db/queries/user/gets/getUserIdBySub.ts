import type { PoolClient } from "pg";


export async function getUserIdBySub(db: PoolClient, sub: string): Promise<string | null> {
    const res = await db.query(`SELECT user_id FROM auth_provider WHERE provider_user_id = $1`, [sub]).then((res) => {
        if(res.rows.length > 0){
            return res.rows[0].user_id
        }else{
            return null
        }
    })

    return res
}