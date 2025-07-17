import type { PoolClient } from "pg";


export async function getDataForUserCookie(db: PoolClient, identifier: {userId?: string, sub?: string}): Promise<{userId: string, role: number}>{
    return {userId: '', role: 1}
}