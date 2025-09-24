import type { PoolClient } from "pg";

export async function getAuthProviderByEmail(db: PoolClient, email: string): Promise<AuthProvider> {
    const res = await db.query("SELECT * FROM auth_provider WHERE email = $1", [email]).then((res) => {
        return res.rows[0]
    })
    return res
}

export async function getAuthProviderByProvidedId(db: PoolClient, id: string): Promise<AuthProvider> {
    const res = await db.query("SELECT * FROM auth_provider WHERE provider_user_id = $1", [id]).then((res) => {
        return res.rows[0]
    })
    return res
}