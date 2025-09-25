import { decrypt } from "$lib/server/api/helpers";
import { getLLToken } from "$lib/server/api/tokens";
import type { RequestHandler } from "@sveltejs/kit";


export const POST: RequestHandler = async ({params, request, locals}) => {
    const userId = params.slug
    const apiKey = request.headers.get('x-api-key')
    const {postIds: existingPostIds, after} = await request.json()

    if(!userId){
        return Response.error()
    }

    try{
        const pool = await locals.db()
        const {token, iv, provider_user_id: instaId} = await getLLToken(pool, userId)
        pool.release()

        const accessToken = decrypt(token, iv)

        const res = await fetch(`${process.env.INSTAGRAM_GRAPH_BASE}/${instaId}/media?access_token=${accessToken}&after=${after}`)

        if(!res.ok){
            console.log('Error retrieving posts from instagram')
            return Response.error()
        }

        const {data, paging} = await res.json()

        if(!data || !paging){
            console.log('Error with getting data from response')
            return Response.error()
        }

        let idsToCall: Promise<Response>[] = []

        data.array.forEach((element: {id: string}) => {
            idsToCall.push(fetch(`${process.env.INSTAGRAM_GRAPH_BASE}/${element.id}/fields=id,caption,media_type,media_url,permalink,timestamp`))
        });

        const postsData = await Promise.all(idsToCall)

        const postsDataJson = postsData.map(async element => await element.json())

        return new Response(JSON.stringify({posts: postsDataJson, cursor: paging.cursors.after}))

    }catch(e){
        console.log('Error gathering instagram posts', e)
        return Response.error()
    }
}