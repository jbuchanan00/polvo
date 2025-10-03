import { decrypt } from "$lib/server/api/helpers";
import { getLLTokenAndId } from "$lib/server/api/tokens";
import type { RequestHandler } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";


export const GET: RequestHandler = async ({params, request, locals, url, fetch}) => {
    const userId = params.slug
    const apiKey = request.headers.get('x-api-key')
    const before = url.searchParams.get('before')

    if(!userId){
        throw error(400, {message: 'No User Id'})
    }

    try{
        const pool = await locals.db()
        const {token, iv, provider_user_id: instaId, tag} = await getLLTokenAndId(pool, userId, 'instagram')
        pool.release()

        const accessToken = decrypt(token, iv, tag)

        const gettingPostsUrl = `${process.env.INSTAGRAM_GRAPH_BASE}/${instaId}/` +
            `media?access_token=${accessToken}${before ? `&before=${before}`: ''}`

        const res = await fetch(gettingPostsUrl)

        if(!res.ok){
            console.log('Error retrieving posts from instagram')
            throw error(500, {message: 'Error retrieving post ids'})
        }

        const {data, paging} = await res.json()

        if(!data || !paging){
            console.log('Error with getting data from response')
            throw error(500, {message: `Couldn't find the posts or paging data`})
        }

        let idsToCall: Promise<Response>[] = []
        
        data.forEach((element: {id: string}) => {
            idsToCall.push(fetch(`${process.env.INSTAGRAM_GRAPH_BASE}/${element.id}` +
                `?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`))
        });
        
        const postsData = await Promise.all(idsToCall)

        const settled = await Promise.allSettled(postsData.map(r => r.json()));

        const ok = settled
            .filter((s): s is PromiseFulfilledResult<unknown> => s.status === "fulfilled")
            .map(s => s.value);

        return new Response(JSON.stringify({posts: ok, cursor: paging.cursors.before}))

    }catch(e){
        console.log('Error gathering instagram posts', e)
        return Response.error()
    }
}