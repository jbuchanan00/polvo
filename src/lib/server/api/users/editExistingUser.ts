import type { PoolClient } from "pg";
import {editUser} from '$lib/db/queries';
import {formatOutgoing} from '$lib/server/api/helpers'

export async function editExistingUser(db: PoolClient, user: User): Promise<void>{
    const formattedUser = formatOutgoing(user)
    console.log('Formatted User', formattedUser)
    await editUser(db, formattedUser)
}