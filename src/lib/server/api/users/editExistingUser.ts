import type { PoolClient } from "pg";
import {editUser} from "$lib/server/db/user";

export async function editExistingUser(db: PoolClient, user: User): Promise<void>{
    await editUser(db, user)
}