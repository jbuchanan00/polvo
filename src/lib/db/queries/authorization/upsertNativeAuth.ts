import { error } from "node:console";
import type { PoolClient } from "pg";


export async function upsertNativeAuth(db: PoolClient, auths: HashAndSalt, userId: string): Promise<void> {
    const {hash, salt} = auths
    try{
        await db.query(`INSERT INTO native_auth (user_id, hash, salt) VALUES ($1, $2, $3)`, [userId, hash, salt])
    }catch(e){
        throw error('Failed in upsert Native Auth', e)
    }
}