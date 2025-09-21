import type { PoolClient } from "pg";

export async function getLLToken(db: PoolClient, userId: string): Promise<string>{
    const res = await db.query(`SELECT * FROM meta_lltokens WHERE user_id=$1`, [userId]).then((res) => {
            if(!res.rows[0]){
                console.log('Error getting long lived token')
                throw new Error()
            }
            return res.rows[0].token
    })

    return res
}