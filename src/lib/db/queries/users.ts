import type { PoolClient } from "pg";

export async function createUser(db: PoolClient, user: RegisteringUser, auths: {hash: string, salt: string}): Promise<boolean> {
    const {email, role, name} = user
    const {hash, salt} = auths
    const id = (await db.query(`INSERT INTO account (username, email, roleId) VALUES ($1, $2, $3) RETURNING id`, [name, email, 1])).rows[0].id
    await db.query(`INSERT INTO authentication (userId, hash, salt) VALUES ($1, $2, $3)`, [id, hash, salt])
    return id ? true : false;
}
