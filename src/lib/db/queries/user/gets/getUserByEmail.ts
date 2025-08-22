import { type PoolClient } from 'pg'

export async function getUserByEmail(db: PoolClient, email: string): Promise<User>{
    let user = (await db.query(`SELECT * FROM app_user WHERE email = $1`, [email])).rows[0]
    return user;
}

