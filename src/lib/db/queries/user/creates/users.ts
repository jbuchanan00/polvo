import type { PoolClient } from "pg";

export async function createUser(db: PoolClient, user: RegisteringUser): Promise<string> {
    const {email, role, givenName, familyName} = user
    const newUuid = crypto.randomUUID()
    const id = (await db.query(`INSERT INTO app_user (id, first_name, last_name, email, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING id`, [newUuid, givenName, familyName, email, role])).rows[0].id
    return id;
}
