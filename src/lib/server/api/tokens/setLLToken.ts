import type { PoolClient } from "pg";
import { encrypt } from "../helpers/encrypt";

export async function setLLToken(db: PoolClient, userId: string, token: string){
    const {ciphertext, iv} = encrypt(token)
    try{
        await db.query(`INSERT INTO meta_lltokens (user_id, token, iv) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO UPDATE SET token = EXCLUDED.token, iv = EXCLUDED.iv`, [userId, ciphertext, iv])
    }catch(e){
        console.log('Error setting long lived token', e)
        return false
    }
    return true
}