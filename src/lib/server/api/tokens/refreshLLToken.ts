import type { PoolClient } from "pg"
import { setLLToken } from "./setLLToken"


export async function refreshLLToken(db: PoolClient, userId: string, token: string){
    const res = await fetch(`https://graph.instagram.com/refresh_access_token?grant_type=refresh_token&access_token=${token}`)
    const data = await res.json()
    const refreshed = await setLLToken(db, userId, data.token)
    return refreshed
}