import { getRedis } from "$lib/server/redis";

export async function setSLToken(userId: string, token: string){
    const redis = getRedis()
    try{
        await redis.hSet(userId, {token})
    }catch(e){
        console.log('Error retrieving from redis', e)
        return false
    }
    return true
}