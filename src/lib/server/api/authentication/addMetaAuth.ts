import type { PoolClient } from "pg";
import {randomUUID} from 'node:crypto'


export async function addMetaAuth(db: PoolClient, userId: string, authUserId: string){
    const id = randomUUID()
    try{
        await db.query(`INSERT INTO auth_provider (id, provider, provider_user_id, user_id) VALUES ($1, $2, $3, $4)`, [id, 'instagram', authUserId, userId])
    }catch(e){
        console.log('Error inserting meta auth', e)
        return false
    }

    return true
}