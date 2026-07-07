import type { RequestHandler } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { resolve } from "$app/paths";
import {exchangeTokens} from "$lib/server/api/tokens";
import { setLLToken } from "$lib/server/api/tokens";
import { getRedis } from "$lib/server/redis";
import { addMetaAuth } from "$lib/server/api/authentication/addMetaAuth";


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


export const GET: RequestHandler = async ({url, locals}) => {
    const code = url.searchParams.get("code")
    const state = url.searchParams.get("state")
    let userId: string

    if(!code || !state){
        console.error('ERROR: no code')
        return new Response(JSON.stringify({message: "Couldn't get code or state"}));
    }
    let res
    try{
        res = await exchangeTokens(code, 'meta')
    }catch(err){
        console.error('ERROR: exchanging tokens', err)
        return new Response(JSON.stringify({message: "Error exchanging tokens for meta"}))
    }
    
    const json = await res.json()
    console.log("This is the code json " + JSON.stringify(json))
    let resExchange = await fetch(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.META_SECRET}&access_token=${json.access_token}`)

    console.log("Passed resExchange", JSON.stringify(resExchange))
    const {access_token} = await resExchange.json()
    userId = await getFromRedis(state)
    console.log("User Id", userId, "and access_token", access_token)
    if(userId === ''){
        return new Response("Couldn't retrieve the user id", {status: 500})
    }
    try{
        const pool = await locals.db()
        await addMetaAuth(pool, userId, json.user_id)
        await setLLToken(pool, userId, access_token)
        pool.release()
    }catch(e){
        console.log(`Couldn't complete meta auth or ll token ${userId}`, e)
        return new Response("Couldn't complete setting token", {status: 500})
    }
    
    return new Response(JSON.stringify({message: "Successfully retrieved and saved access token"}))
}

