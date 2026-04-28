import { getRedis } from "$lib/server/redis";

export async function getSLToken(userId: string): Promise<string | null>{
    const redis = getRedis()
    const userToken = await redis.hGet(userId, 'token')

    return userToken
}