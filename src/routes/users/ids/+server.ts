import { getUsersByIds } from "$lib/db/queries/user/gets/getUsersByIds";
import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async ({url, locals}) => {
    console.log("Getting Users By Ids")
    let i = 0;
    const ids = url.searchParams.getAll('id')
    console.log("Called to get user information")
    
    if(!ids || ids.length < 1){
        return new Response("No ids")
    }

    const pool = await locals.db()
    try{
        const res = await getUsersByIds(pool, ids)
        console.log("Got Users by Ids in:", +Date.now()-i)
        return new Response(JSON.stringify(res))
    }catch(e){
        console.log("Error Getting Users By Ids:", e)
        return new Response('Error', {
            status: 400
        })
    }finally{
        pool.release()
    }
}