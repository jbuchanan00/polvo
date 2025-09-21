import { getRedis } from "$lib/redis";

export async function setSLToken(userId: string, token: string){
    const redis = await getRedis()
    try{
        await redis.hSet(userId, {token})
    }catch(e){
        console.log('Error retrieving from redis', e)
        return false
    }
    return true
}