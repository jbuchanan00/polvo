import { getUserByEmail } from "$lib/db/queries";
import type { PoolClient } from "pg";


export async function verifyUserExists(db: PoolClient, email: string): Promise<boolean> {
    const user = await getUserByEmail(db, email)
    if(user && user !== null && user?.id !== null){
        return true
    }else{
        return false
    }
}