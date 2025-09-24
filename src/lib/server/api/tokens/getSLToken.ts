import { getRedis } from "$lib/redis";

export async function getSLToken(userId: string): Promise<string>{
    const redis = await getRedis()
    const userToken = await redis.hget(userId, 'token')

    return userToken
}