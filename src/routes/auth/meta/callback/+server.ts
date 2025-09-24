import type { RequestHandler } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { resolve } from "$app/paths";
import exchangeTokens from "$lib/server/api/tokens/exchangeTokens";
import { setLLToken } from "$lib/server/api/tokens";



export const GET: RequestHandler = async ({url, locals}) => {
    const code = url.searchParams.get("code")

    if(!code){
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

    res = await fetch(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.META_SECRET}&access_token=${json.data[0].access_token}`)

    const longLivedToken = await res.json().then(val => {return val.access_token})

    try{
        const pool = await locals.db()
        await setLLToken(pool, locals.user.id, longLivedToken)
        pool.release()
    }catch(e){
        console.log(`Could'nt retrieve ll token for ${locals.user.id}`, e)
        return Response.error()
    }

    return new Response()
}