import type { PoolClient } from "pg";
import {editUser} from '$lib/db/queries';
import {formatOutgoing} from '$lib/server/api/helpers'

export async function editExistingUser(db: PoolClient, user: Record<string, any>): Promise<Object>{
    const formattedUser = formatOutgoing(user)
    return await editUser(db, formattedUser)
}