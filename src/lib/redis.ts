import {createClient, type RedisClientType} from 'redis'

let client: RedisClientType | undefined

export async function getRedis(){
    if(!client){
        client = createClient({url: process.env.REDIS_URL})
        client.on("error", (e: any) => console.error("Redis error", e))
        await client.connect()
    }
    return client
}


process.on("SIGINT", async () => {
    if(client){
        await client.quit()
        console.log('Redis client closed on SIGNINT')
    }
    process.exit(0)
})

process.on("SIGTERM", async() => {
    if(client){
        await client.quit()
        console.log('Redis client closed on SIGTERM')
    }
    process.exit(0)
})