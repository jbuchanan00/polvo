import type { PoolClient } from "pg";
import { getUserIdBySub } from "$lib/db/queries";

export async function retrieveUserIdBySub(db: PoolClient, sub: string): Promise<string | null> {
    return await getUserIdBySub(db, sub)
}