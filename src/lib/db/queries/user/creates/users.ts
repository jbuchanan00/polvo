import type { PoolClient } from "pg";

export async function createUser(db: PoolClient, user: RegisteringUser): Promise<string> {
    const {email, username} = user
    const newUuid = crypto.randomUUID()
    const id = (await db.query(`INSERT INTO app_user (id, username, email) VALUES ($1, $2, $3) RETURNING id`, [newUuid, username, email])).rows[0].id
    return id;
}
