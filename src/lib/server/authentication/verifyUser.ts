import type { PoolClient } from "pg";


export async function verifyUserExistsByEmail(db: PoolClient, email: string): Promise<boolean>{
    const user = (await db.query('SELECT * FROM account WHERE email=$1', [email])).rows[0]
    if(user?.id){
        return true
    }else{
        return false
    }
}