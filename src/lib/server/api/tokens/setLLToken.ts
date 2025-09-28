import type { PoolClient } from "pg";
import { encrypt } from "../helpers/encrypt";

export async function setLLToken(db: PoolClient, userId: string, token: string){
    const {ciphertext, iv, tag} = encrypt(token)
    try{
        await db.query(`INSERT INTO meta_lltokens (user_id, token, iv, tag) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id) DO UPDATE SET token = EXCLUDED.token, iv = EXCLUDED.iv, tag = EXCLUDED.tag`, [userId, ciphertext, iv, tag])
    }catch(e){
        console.log('Error setting long lived token', e)
        return false
    }
    return true
}