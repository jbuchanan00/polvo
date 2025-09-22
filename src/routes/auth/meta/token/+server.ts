import { getLLToken } from "$lib/server/api/tokens";
import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async ({url, locals}) => {
    const userId = url.searchParams.get("userId")
    let returnPayload

    if(!userId){
        return Response.error()
    }

    try{
        const pool = await locals.db()
        const {token, iv, tag} = await getLLToken(pool, userId)
        pool.release()
        returnPayload = {token, iv, tag}
    }catch(e){
        console.log('Error retrieving data', e)
        return Response.error()
    }
    return new Response(JSON.stringify(returnPayload))
}