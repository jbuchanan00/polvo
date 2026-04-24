import { getUsersByIds } from "$lib/db/queries/user/gets/getUsersByIds";
import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async ({url, locals}) => {
    const ids = url.searchParams.getAll('id')
    
    if(!ids || ids.length < 1){
        return new Response("No ids")
    }

    try{
        const pool = await locals.db()
        const res = await getUsersByIds(pool, ids)
        console.log("Response: " + JSON.stringify(res))
        return new Response(JSON.stringify(res))
    }catch(e){
        console.log("Error Getting Users By Ids:", e)
        return new Response('Error', {
            status: 400
        })
    }
}