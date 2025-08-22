import type { PoolClient } from "pg";


export async function createAuthProvider(db: PoolClient, payload: AuthProvider): Promise<string> {
    const newUuid = crypto.randomUUID()
    const method = payload.providerUserId ? 'provider_user_id, email' : 'email'
    const argLengths = payload.providerUserId ? ', $5' : ''
    let sqlArgs: (string | number | null)[] = [newUuid, payload.userId, payload.provider]
    payload.providerUserId ? sqlArgs.push(payload.providerUserId, payload.email) : sqlArgs.push(payload.email)
    const res = await db.query(`INSERT INTO auth_provider (id, user_id, provider, ${method}) VALUES ($1, $2, $3, $4 ${argLengths}) RETURNING id`, sqlArgs)
        .then((res) => {
            return res.rows[0]
        })
    return res
}