import type { PoolClient } from "pg";
import { getUserIdBySub } from "$lib/db/queries";

export async function retrieveUserIdBySub(db: PoolClient, sub: string): Promise<string> {
    return await getUserIdBySub(db, sub)
}