import { decrypt } from "../helpers";
import type { PoolClient } from "pg";

export async function getLLToken(db: PoolClient, userId: string): Promise<{token: string, iv: string, tag: string}>{
    const {token, iv, tag} = await db.query(`SELECT * FROM meta_lltokens WHERE user_id=$1`, [userId]).then((res) => {
            if(!res.rows[0]){
                console.log('Error getting long lived token')
                throw new Error()
            }
            return res.rows[0]
    })

    //const res = decrypt(token, iv, tag)

    return {token, iv, tag}
}