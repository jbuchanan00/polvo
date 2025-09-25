import type { RequestHandler } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { resolve } from "$app/paths";
import {exchangeTokens} from "$lib/server/api/tokens";
import { setLLToken } from "$lib/server/api/tokens";
import { getRedis } from "$lib/server/redis";


async function getFromRedis(state:string){
    const r = getRedis()
    const raw = await r.get(`ig:state:${state}`)
    if(!raw){
        return ''
    }
    let {userId} = await JSON.parse(raw)
    await r.del(`ig:state:${state}`)
    return userId
}


export const GET: RequestHandler = async ({url, locals, cookies}) => {
    const code = url.searchParams.get("code")
    const state = url.searchParams.get("state")

    let userId: string

    if(!code || !state){
        console.error('ERROR: no code')
        throw redirect(303, `${resolve(`/${locals.user.id}?status=fail`)}`)
    }

    let res
    try{
        res = await exchangeTokens(code, 'meta')
    }catch(err){
        console.error('ERROR: exchanging tokens', err)
        throw redirect(303, `${resolve(`/${locals.user.id}?status=fail`)}`)
    }

    const json = await res.json()
    res = await fetch(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.META_SECRET}&access_token=${json.access_token}`)

    

    const {access_token} = await res.json()
    userId = locals.user?.id || await getFromRedis(state)
    
    if(userId === ''){
        return Response.error()
    }
    try{
        const pool = await locals.db()
        await setLLToken(pool, userId, access_token)
        pool.release()
    }catch(e){
        console.log(`Could'nt retrieve ll token for ${userId}`, e)
        return Response.error()
    }

    throw redirect(300, `${resolve(`/${userId}`)}`)
}