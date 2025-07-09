import { getUserById } from "$lib/db/queries/getUser/getUserById";
import type { PoolClient } from "pg";


export async function getUserByJwt(db: PoolClient, userId: string): Promise<User> {
    const res = await getUserById(db, userId)
    console.log(res)
    return res
}