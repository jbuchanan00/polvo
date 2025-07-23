import type { PoolClient } from "pg";
import {editUser} from "$lib/server/db/user";
import {formatOutgoing} from '$lib/server/api/helpers'

export async function editExistingUser(db: PoolClient, user: User): Promise<void>{
    const formattedUser = formatOutgoing(user)
    await editUser(db, formattedUser)
}