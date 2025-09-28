import { decrypt } from "../helpers";
import type { PoolClient } from "pg";

export async function getLLTokenAndId(db: PoolClient, userId: string, provider: string): Promise<{token: string, iv: string, tag: string, provider_user_id: string}>{
    const {token, iv, tag, provider_user_id} = await db.query(`SELECT meta_lltokens.*, auth_provider.provider_user_id FROM meta_lltokens LEFT JOIN auth_provider ON meta_lltokens.user_id = auth_provider.user_id WHERE meta_lltokens.user_id=$1 and auth_provider.provider=$2`, [userId, provider]).then((res) => {
            if(!res.rows[0]){
                console.log('Error getting long lived token')
                throw new Error()
            }
            return res.rows[0]
    })

    //const res = decrypt(token, iv, tag)

    return {token, iv, tag, provider_user_id}
}