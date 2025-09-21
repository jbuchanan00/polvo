import type { PoolClient } from "pg";

export async function setLLToken(db: PoolClient, userId: string, token: string){
    try{
        await db.query(`INSERT INTO meta_lltokens (user_id, token) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET token = EXCLUDED.token`, [userId, token])
    }catch(e){
        console.log('Error setting long lived token', e)
        return false
    }
    return true
}