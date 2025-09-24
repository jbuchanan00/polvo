import type { PoolClient } from "pg";
import { createAuthProvider } from "$lib/db/queries";

export async function prepCreateAuthProvider(db: PoolClient, payload: AuthProvider): Promise<void> {
    await createAuthProvider(db, payload)
}