//GET /userforpost?userId

import { getUserForPost } from "$lib/server/api/users";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({url, locals}): Promise<Response> => {
    console.log("Began Get User For Post")
    let i = Date.now()
    const userId = url.searchParams.get('userId')

    
    if(!userId){
        return new Response('Missing UserId', {status: 400})
    }
    const pool = await locals.db()
    const user = await getUserForPost(pool, userId)
    pool.release()
    if(!user){
        return new Response('Invalid UserId', {status: 404})
    }
    console.log("Successfully Got User for Post in:", +Date.now()-i)
    return new Response(JSON.stringify(user), {status: 200})
}