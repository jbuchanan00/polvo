import type { RequestHandler } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { resolve } from "$app/paths";
import exchangeTokens from "$lib/server/api/tokens/exchangeTokens";



export const GET: RequestHandler = async ({url, locals}) => {
    const code = url.searchParams.get("code")

    if(!code){
        console.error('ERROR: no code')
        throw redirect(303, `${resolve(`/${locals.user.id}?status=fail`)}`)
    }

    let res
    try{
        res = exchangeTokens(code, 'meta')
    }catch(err){
        console.error('ERROR: exchanging tokens', err)
        throw redirect(303, `${resolve(`/${locals.user.id}?status=fail`)}`)
    }

    const json = await res.then(async res => {
        return await res.json()
    })


    return new Response()
}