import { decrypt } from "$lib/server/api/helpers";
import { getLLToken } from "$lib/server/api/tokens";
import type { RequestHandler } from "@sveltejs/kit";


export const POST: RequestHandler = async ({params, request, locals}) => {
    const userId = params.slug
    const apiKey = request.headers.get('x-api-key')
    const {postIds: existingPostIds} = await request.json()

    if(!userId){
        return Response.error()
    }

    try{
        const pool = await locals.db()
        const {token, iv, tag, provider_user_id: instaId} = await getLLToken(pool, userId)
        pool.release()

        const accessToken = decrypt(token, iv, tag)

        const res = await fetch(`${process.env.INSTAGRAM_GRAPH_BASE}/${instaId}/media?access_token=${accessToken}`)

        if(!res.ok){
            console.log('Error retrieving posts from instagram')
            return Response.error()
        }

        const {data} = await res.json()

        if(!data){
            console.log('Error with getting data from response')
            return Response.error()
        }



    }catch(e){
        console.log('Error gathering instagram posts', e)
        return Response.error()
    }

    return new Response()
}